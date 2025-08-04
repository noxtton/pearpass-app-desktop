import fs from 'fs'
import os from 'os'
import path from 'path'

import { logger } from './logger.js'

/**
 * Simple unified logging for native messaging components
 */
export const log = (component, level, message) => {
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
    logger.error(
      `[nativeMessagingLogger] Failed to write log entry - Component: ${component}, Level: ${level}, Message: ${message}'}`
    )
    logger.error(e)
  }
}
