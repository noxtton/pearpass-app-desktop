const { EventEmitter } = require('events')
const fs = require('fs')

const { NativeMessagingHandler } = require('./nativeMessagingHandler.cjs')
const { wrapMessage } = require('./nativeMessagingProtocol.js')
const { logger } = require('../utils/logger.js')

jest.mock('fs')
jest.mock('../utils/logger.js', () => ({
  logger: {
    error: jest.fn(),
    info: jest.fn(),
    debug: jest.fn()
  }
}))

const mockStdin = new EventEmitter()
mockStdin.resume = jest.fn()
mockStdin.pause = jest.fn()
mockStdin.setEncoding = jest.fn()
// Spy on removeAllListeners to track calls, but keep original functionality
const removeAllListenersSpy = jest.spyOn(mockStdin, 'removeAllListeners')
Object.defineProperty(process, 'stdin', { value: mockStdin, writable: true })

const mockStdout = {
  write: jest.fn()
}
Object.defineProperty(process, 'stdout', { value: mockStdout, writable: true })

describe('NativeMessagingHandler', () => {
  let handler
  beforeEach(() => {
    jest.clearAllMocks()
    // Ensure mockStdin is clean before each test
    mockStdin.removeAllListeners()
    // Since we are spying, we need to clear mock history for it as well
    removeAllListenersSpy.mockClear()
    handler = new NativeMessagingHandler()
  })

  afterEach(() => {
    handler.stop()
  })

  describe('logging fallback', () => {
    it('should call logger.error when fs.appendFileSync fails', () => {
      const errorMessage = 'Failed to write to log file'
      fs.appendFileSync.mockImplementation(() => {
        throw new Error(errorMessage)
      })

      // The 'start' method triggers a log message.
      handler.start()

      // The first log is 'INFO', 'Starting native messaging handler'
      // We check if the fallback logger was called with the message part of that log.
      expect(logger.error).toHaveBeenCalledWith(
        'Starting native messaging handler'
      )
    })
  })

  describe('constructor', () => {
    it('should initialize with default values', () => {
      expect(handler.inputBuffer).toEqual(Buffer.alloc(0))
      expect(handler.messageInProgress).toBe(false)
      expect(handler.expectedMessageLength).toBe(0)
      expect(handler.accumulatedString).toBe('')
      expect(handler.useRobustParsing).toBe(true)
    })
    it('should set up stdin listeners and resume stdin', () => {
      handler.start()
      expect(mockStdin.setEncoding).toHaveBeenCalledWith(null)
      expect(mockStdin.listeners('data').length).toBe(1)
      expect(mockStdin.listeners('end').length).toBe(1)
      expect(mockStdin.listeners('error').length).toBe(1)
      expect(mockStdin.resume).toHaveBeenCalled()
    })
    it('should pause stdin and remove all listeners', () => {
      handler.start() // to add listeners
      handler.stop()
      expect(mockStdin.pause).toHaveBeenCalled()
      expect(removeAllListenersSpy).toHaveBeenCalled()
      expect(handler.inputBuffer).toEqual(Buffer.alloc(0))
    })
  })

  describe('send', () => {
    it('should send a properly formatted message to stdout', () => {
      const message = { type: 'test', data: 'hello' }
      const wrappedMessage = wrapMessage(message)
      const jsonStr = JSON.stringify(wrappedMessage)
      const jsonBuffer = Buffer.from(jsonStr)
      const header = Buffer.alloc(4)
      header.writeUInt32LE(jsonBuffer.length, 0)

      handler.send(message)

      expect(mockStdout.write).toHaveBeenCalledWith(header)
      expect(mockStdout.write).toHaveBeenCalledWith(jsonBuffer)
    })

    it('should emit an error if sending fails', () => {
      const errorSpy = jest.spyOn(handler, 'emit')
      const circularMessage = {}
      circularMessage.a = circularMessage
      try {
        handler.send(circularMessage)
      } catch (e) {
        logger.error('error', e.message)
        // The current implementation throws instead of emitting.
        // This test will fail until the implementation is fixed to emit an error.
        // For now, we catch to prevent an unhandled error in tests.
      }
      expect(errorSpy).toHaveBeenCalledWith('error', expect.any(TypeError))
    })
  })

  describe('handleIncomingChunk with standard parsing', () => {
    beforeEach(() => {
      handler.useRobustParsing = false
    })

    it('should process a complete message', () => {
      const messageSpy = jest.fn()
      handler.on('message', messageSpy)

      const message = { test: 'data' }
      const messageBuffer = Buffer.from(JSON.stringify(message))
      const header = Buffer.alloc(4)
      header.writeUInt32LE(messageBuffer.length, 0)
      const chunk = Buffer.concat([header, messageBuffer])

      handler.handleIncomingChunk(chunk)

      expect(messageSpy).toHaveBeenCalledWith(message)
    })

    it('should handle message too large error', () => {
      const errorSpy = jest.fn()
      handler.on('error', errorSpy)

      const header = Buffer.alloc(4)
      // MESSAGE_SIZE_LIMIT is 1024 * 1024
      header.writeUInt32LE(1024 * 1024 + 1, 0)

      handler.handleIncomingChunk(header)

      expect(handler.inputBuffer.length).toBe(0)
    })

    it('should handle invalid JSON', () => {
      const errorSpy = jest.fn()
      handler.on('error', errorSpy)

      const messageBuffer = Buffer.from('{ not json }')
      const header = Buffer.alloc(4)
      header.writeUInt32LE(messageBuffer.length, 0)
      const chunk = Buffer.concat([header, messageBuffer])

      handler.handleIncomingChunk(chunk)

      expect(errorSpy).toHaveBeenCalledWith(new Error('Invalid JSON message'))
    })
  })

  describe('handleIncomingChunk with robust parsing', () => {
    it('should process a message despite incorrect length header', () => {
      const messageSpy = jest.fn()
      handler.on('message', messageSpy)

      const message = { test: 'robust' }
      const messageBuffer = Buffer.from(JSON.stringify(message))
      const header = Buffer.alloc(4)
      // Incorrect length
      header.writeUInt32LE(1, 0)
      const chunk = Buffer.concat([header, messageBuffer])

      handler.handleIncomingChunk(chunk)

      expect(messageSpy).toHaveBeenCalledWith(message)
      expect(handler.inputBuffer.length).toBe(0)
    })

    it('should wait for more data for an incomplete JSON object', () => {
      const messageSpy = jest.fn()
      handler.on('message', messageSpy)

      const part1 = '{"key":'
      const part2 = '"value"}'
      const header = Buffer.alloc(4)
      header.writeUInt32LE(1, 0) // Incorrect length

      const chunk1 = Buffer.concat([header, Buffer.from(part1)])
      handler.handleIncomingChunk(chunk1)
      expect(messageSpy).not.toHaveBeenCalled()

      const chunk2 = Buffer.from(part2)
      handler.handleIncomingChunk(chunk2)
      expect(messageSpy).toHaveBeenCalledWith({ key: 'value' })
    })
  })
})
