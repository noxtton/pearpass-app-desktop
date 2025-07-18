import fs from 'fs'
import path from 'path'

/**
 * Simple unified logging for native messaging components
 */
export function log(component, level, message) {
  try {
    const logFile = path.join(process.cwd(), 'logs', 'native-messaging.log')
    const timestamp = new Date().toISOString()
    const logMsg = `${timestamp} [${level}] [${component}] ${message}\n`
    fs.appendFileSync(logFile, logMsg)
  } catch (e) {
    console.error(`[${component}] ${message}`)
  }
}
