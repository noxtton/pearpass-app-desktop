const fs = require('bare-fs')
const os = require('bare-os')
const path = require('bare-path')

const DEBUG_MODE = false

/**
 * Returns cross-platform IPC path
 * Socket is stored in temp directory
 * @param {string} socketName
 * @returns {string}
 */
const getIpcPath = (socketName) => {
  if (os.platform() === 'win32') {
    return `\\\\?\\pipe\\${socketName}`
  }

  // Socket is in temp directory
  return path.join(os.tmpdir(), `${socketName}.sock`)
}

/**
 * Dedicated logger for native messaging bridge
 * Logs to the logs directory within the bridge module directory when in debug mode
 * @param {'INFO'|'ERROR'|'DEBUG'|'WARN'} level - Log level
 * @param {string} message - Log message
 */
const log = (level, message) => {
  if (!DEBUG_MODE) return

  try {
    const bridgeDir = path.dirname(__dirname)
    const logDir = path.join(bridgeDir, 'logs')
    const logFile = path.join(logDir, 'native-messaging-bridge.log')

    // Create logs directory if it doesn't exist
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true })
    }

    const timestamp = new Date().toISOString()
    const logMsg = `${timestamp} [${level}] [IPC-BRIDGE] ${message}\n`
    fs.appendFileSync(logFile, logMsg)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`Failed to write log: ${e.message}`)
  }
}

module.exports = {
  getIpcPath,
  log
}
