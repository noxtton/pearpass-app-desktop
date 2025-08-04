const os = require('os')
const path = require('path')
const fs = require('fs')

/**
 * Returns cross-platform IPC path
 * Uses the script's parent directory (Pear storage) for the socket
 */
function getIpcPath(socketName) {
  if (os.platform() === 'win32') {
    return `\\\\?\\pipe\\${socketName}`
  }
  
  // Get the parent directory of the scripts directory
  // Scripts are in: {storage}/native-messaging/
  // We want the socket in: {storage}/
  const storageDir = path.dirname(__dirname)
  return path.join(storageDir, `${socketName}.sock`)
}

/**
 * Simple logger for native messaging
 */
function log(component, level, message) {
  try {
    const tempDir = os.tmpdir()
    const logDir = path.join(tempDir, 'pearpass-logs')
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
