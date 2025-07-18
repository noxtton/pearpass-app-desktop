import fs from 'fs'
import path from 'path'

/**
 * Simple unified logging for native messaging components
 */
export const log = (component, level, message) => {
  try {
    const logDir = path.join(process.cwd(), 'logs')
    const logFile = path.join(logDir, 'native-messaging.log')
    
    // Create logs directory if it doesn't exist
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true })
    }
    
    const timestamp = new Date().toISOString()
    const logMsg = `${timestamp} [${level}] [${component}] ${message}\n`
    fs.appendFileSync(logFile, logMsg)
  } catch (e) {
    console.error(`[nativeMessagingLogger] Failed to write log entry - Component: ${component}, Level: ${level}, Message: ${message}'}`)
    console.error(e)
  }
}
