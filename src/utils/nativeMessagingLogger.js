import fs from 'fs'
import path from 'path'

import { logger } from './logger.js'

/**
 * Get the project root directory by looking for package.json
 */
const getProjectRoot = () => {
  let currentDir = process.cwd()

  // Walk up the directory tree until we find package.json
  while (currentDir !== path.dirname(currentDir)) {
    if (fs.existsSync(path.join(currentDir, 'package.json'))) {
      return currentDir
    }
    currentDir = path.dirname(currentDir)
  }

  // Fallback to current working directory
  return process.cwd()
}

/**
 * Simple unified logging for native messaging components
 */
export const log = (component, level, message) => {
  try {
    const projectRoot = getProjectRoot()
    const logDir = path.join(projectRoot, 'logs')
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
