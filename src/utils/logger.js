export class Logger {
  constructor({ debugMode }) {
    this.debugMode = debugMode || false
  }

  /**
   * Log a message with component and level
   * @param {string} component - Component name
   * @param {'INFO'|'ERROR'|'DEBUG'|'WARN'} level - Log level
   * @param {string} message - Log message
   */
  log(component, level, message) {
    const timestamp = new Date().toISOString()
    const formattedMessage = `${timestamp} [${level}] [${component}] ${message}`
    
    switch (level) {
      case 'ERROR':
        console.error(formattedMessage)
        break
      case 'WARN':
        console.warn(formattedMessage)
        break
      case 'DEBUG':
        if (this.debugMode) {
          console.log(formattedMessage)
        }
        break
      case 'INFO':
      default:
        console.log(formattedMessage)
        break
    }
  }

  error(...messages) {
    const message = messages.join(' ')
    this.log('GENERAL', 'ERROR', message)
  }
}

export const logger = new Logger({
  debugMode: true
})
