import { EventEmitter } from 'events'
import fs from 'fs'
import path from 'path'

import {
  wrapMessage,
  unwrapMessage,
  isWrappedMessage
} from './nativeMessagingProtocol.js'

const log = (level, message) => {
  try {
    const logFile = path.join(
      process.cwd(),
      'logs',
      'native-messaging-handler.log'
    )
    const timestamp = new Date().toISOString()
    const logMsg = `${timestamp} [${level}] ${message}\n`
    fs.appendFileSync(logFile, logMsg)
  } catch {
    console.error(message)
  }
}

// Constants
const MESSAGE_SIZE_LIMIT = 1024 * 1024 // 1MB
const HEADER_SIZE = 4

/**
 * Native Messaging Handler - handles Chrome native messaging protocol
 * Includes robust parsing to handle Chrome's length header bugs
 */
export class NativeMessagingHandler extends EventEmitter {
  constructor() {
    super()
    this.inputBuffer = Buffer.alloc(0)
    this.messageInProgress = false
    this.expectedMessageLength = 0
    this.accumulatedString = ''
    this.useRobustParsing = true // Use robust parsing by default
  }

  start() {
    log('INFO', 'Starting native messaging handler')
    this._setupStdinListeners()
    process.stdin.resume()
    log('INFO', 'Native messaging handler started')
  }

  _setupStdinListeners() {
    process.stdin.setEncoding(null)
    process.stdin.on('data', (chunk) => this.handleIncomingChunk(chunk))
    process.stdin.on('end', () => this.emit('disconnect'))
    process.stdin.on('error', (err) => {
      log('ERROR', `stdin error: ${err.message}`)
      this.emit('error', err)
    })
  }

  handleIncomingChunk(chunk) {
    const buffer = this._ensureBuffer(chunk)
    this.inputBuffer = Buffer.concat([this.inputBuffer, buffer])

    while (this.processNextMessage()) {
      // Continue processing while we have complete messages
    }
  }

  _ensureBuffer(chunk) {
    return Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, 'binary')
  }

  processNextMessage() {
    if (this.useRobustParsing) {
      return this.processNextMessageRobust()
    }
    return this._processStandardMessage()
  }

  _processStandardMessage() {
    if (this.inputBuffer.length < HEADER_SIZE) {
      return false
    }

    if (!this.messageInProgress) {
      if (!this._readMessageLength()) {
        return false
      }
    }

    const totalLength = HEADER_SIZE + this.expectedMessageLength
    if (this.inputBuffer.length < totalLength) {
      return false
    }

    const messageBuffer = this.inputBuffer.slice(HEADER_SIZE, totalLength)
    this.inputBuffer = this.inputBuffer.slice(totalLength)
    this._resetMessageState()

    return this._parseAndEmitMessage(messageBuffer)
  }

  _readMessageLength() {
    this.expectedMessageLength = this.inputBuffer.readUInt32LE(0)
    this.messageInProgress = true

    if (this.expectedMessageLength > MESSAGE_SIZE_LIMIT) {
      log('ERROR', `Message too large: ${this.expectedMessageLength}`)
      this._resetBuffer()
      return false
    }
    return true
  }

  _resetMessageState() {
    this.messageInProgress = false
    this.expectedMessageLength = 0
  }

  _resetBuffer() {
    this.inputBuffer = Buffer.alloc(0)
    this._resetMessageState()
  }

  _parseAndEmitMessage(messageBuffer) {
    try {
      const message = JSON.parse(messageBuffer.toString())
      this._handleParsedMessage(message)
      return true
    } catch (err) {
      log('ERROR', `Failed to parse message: ${err.message}`)
      this.emit('error', new Error('Invalid JSON message'))
      return false
    }
  }

  _handleParsedMessage(message) {
    if (isWrappedMessage(message)) {
      const unwrapped = unwrapMessage(message)
      if (unwrapped) {
        this.emit('message', unwrapped)
      } else {
        this.emit('error', new Error('Failed to unwrap protocol message'))
      }
    } else {
      this.emit('message', message)
    }
  }

  /**
   * Robust message processing that handles Chrome's length header bugs
   * Chrome sometimes sends incorrect length headers, especially around 255 bytes
   */
  processNextMessageRobust() {
    if (this.inputBuffer.length < 4) {
      return false
    }

    // Skip Chrome's potentially incorrect length header
    const dataAfterHeader = this.inputBuffer.slice(4).toString('utf8')
    this.accumulatedString = dataAfterHeader

    // Find complete JSON objects by parsing braces
    let foundMessage = false
    let startIndex = 0

    while (startIndex < this.accumulatedString.length) {
      const openBrace = this.accumulatedString.indexOf('{', startIndex)
      if (openBrace === -1) {
        break
      }

      // Parse JSON manually to find the end
      let braceCount = 0
      let inString = false
      let escapeNext = false
      let endIndex = -1

      for (let i = openBrace; i < this.accumulatedString.length; i++) {
        const char = this.accumulatedString[i]

        if (escapeNext) {
          escapeNext = false
          continue
        }

        if (char === '\\') {
          escapeNext = true
          continue
        }

        if (char === '"' && !escapeNext) {
          inString = !inString
          continue
        }

        if (!inString) {
          if (char === '{') {
            braceCount++
          } else if (char === '}') {
            braceCount--
            if (braceCount === 0) {
              endIndex = i + 1
              break
            }
          }
        }
      }

      if (endIndex === -1) {
        // Incomplete JSON, wait for more data
        return false
      }

      const jsonStr = this.accumulatedString.substring(openBrace, endIndex)

      try {
        const message = JSON.parse(jsonStr)

        if (isWrappedMessage(message)) {
          const unwrapped = unwrapMessage(message)
          if (unwrapped) {
            this.emit('message', unwrapped)
          } else {
            this.emit('error', new Error('Failed to unwrap protocol message'))
          }
        } else {
          this.emit('message', message)
        }

        // Remove processed message from buffer
        const bytesToRemove =
          4 +
          Buffer.from(this.accumulatedString.substring(0, endIndex), 'utf8')
            .length
        this.inputBuffer = this.inputBuffer.slice(bytesToRemove)

        foundMessage = true
        break
      } catch (err) {
        log('ERROR', `Failed to parse JSON: ${err.message}`)
        startIndex = openBrace + 1
      }
    }

    // Clear buffer if it gets too large without valid messages
    if (!foundMessage && this.inputBuffer.length > 10000) {
      log('ERROR', 'Buffer too large without valid message, clearing')
      this.inputBuffer = Buffer.alloc(0)
      this.accumulatedString = ''
    }

    return foundMessage
  }

  send(message) {
    try {
      log('DEBUG', `Sending message: ${JSON.stringify(message)}`)

      // Wrap the message with protocol
      const wrapped = wrapMessage(message)
      const jsonStr = JSON.stringify(wrapped)
      const jsonBuffer = Buffer.from(jsonStr)

      // Create 4-byte length header
      const header = Buffer.allocUnsafe(4)
      header.writeUInt32LE(jsonBuffer.length, 0)

      // Write header and message
      process.stdout.write(header)
      process.stdout.write(jsonBuffer)

      log('DEBUG', 'Message sent successfully')
    } catch (err) {
      log('ERROR', `Failed to send message: ${err.message}`)
      this.emit('error', err)
    }
  }

  stop() {
    process.stdin.pause()
    process.stdin.removeAllListeners()
    this.inputBuffer = Buffer.alloc(0)
    log('INFO', 'Native messaging handler stopped')
  }
}
