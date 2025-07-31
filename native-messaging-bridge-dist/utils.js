const os = require('os')
const path = require('path')
const fs = require('fs')

/**
 * Returns cross-platform IPC path
 */
function getIpcPath(socketName) {
  if (os.platform() === 'win32') {
    return `\\\\?\\pipe\\${socketName}`
  }
  return path.join(os.tmpdir(), `${socketName}.sock`)
}

/**
 * Simple logger for native messaging
 */
function log(component, level, message) {
  try {
    const tempDir = os.tmpdir()
    const logDir = path.join(tempDir, 'logs')
    const logFile = path.join(logDir, 'native-messaging.log')

    // Create logs directory if it doesn't exist
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true })
    }

    const timestamp = new Date().toISOString()
    const logMsg = `${timestamp} [${level}] [${component}] ${message}\n`
    fs.appendFileSync(logFile, logMsg)
  } catch (e) {
    console.error(`Failed to write log: ${e.message}`)
  }
}

module.exports = {
  getIpcPath,
  log
}
