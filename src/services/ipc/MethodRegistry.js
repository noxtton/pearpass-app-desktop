import { logger } from '../../utils/logger'

/**
 * Registry for IPC method handlers with configuration support
 */
export class MethodRegistry {
  constructor() {
    this.handlers = new Map()
    this.configs = new Map()
  }

  /**
   * Register a handler for a method
   * @param {string} name - Method name
   * @param {Function} handler - Handler function
   * @param {Object} config - Configuration for the handler
   */
  register(name, handler, config = {}) {
    this.handlers.set(name, handler)
    this.configs.set(name, {
      requiresStatus: config.requiresStatus || [],
      logLevel: config.logLevel || 'INFO',
      ...config
    })
  }

  /**
   * Execute a registered method
   * @param {string} methodName - Name of the method to execute
   * @param {any} params - Parameters for the method
   * @param {Object} context - Execution context (client, logger, etc.)
   */
  async execute(methodName, params, context) {
    const handler = this.handlers.get(methodName)
    if (!handler) {
      logger.log('METHOD-REGISTRY', 'ERROR', `Unknown method: ${methodName}`)
      const availableMethods = Array.from(this.handlers.keys()).slice(0, 10)
      logger.log(
        'METHOD-REGISTRY',
        'ERROR',
        `Available methods: ${availableMethods.join(', ')}`
      )
      throw new Error(`UnknownMethod: ${methodName}`)
    }

    const config = this.configs.get(methodName)

    // Log status checks if configured
    if (config.requiresStatus && config.requiresStatus.length > 0) {
      await this.performStatusChecks(methodName, config.requiresStatus, context)
    }

    // Log method call
    if (config.logLevel === 'DEBUG') {
      logger.log(
        'METHOD-REGISTRY',
        'DEBUG',
        `Executing ${methodName} with params: ${JSON.stringify(params)}`
      )
    }

    try {
      // Execute handler
      const result = await handler(params)

      // Log result if debug
      if (config.logLevel === 'DEBUG' && result) {
        logger.log(
          'METHOD-REGISTRY',
          'DEBUG',
          `${methodName} result: ${JSON.stringify(result)}`
        )
      }

      return result
    } catch (error) {
      logger.log(
        'METHOD-REGISTRY',
        'ERROR',
        `Error in ${methodName}: ${error.message}`
      )
      throw error
    }
  }

  /**
   * Perform status checks before method execution
   */
  async performStatusChecks(methodName, statusChecks, context) {
    const statuses = {}

    for (const check of statusChecks) {
      switch (check) {
        case 'encryption':
          statuses.encStatus = await context.client.encryptionGetStatus()
          break
        case 'vaults':
          statuses.vaultsStatus = await context.client.vaultsGetStatus()
          break
        case 'activeVault':
          statuses.activeVaultStatus =
            await context.client.activeVaultGetStatus()
          break
      }
    }

    if (Object.keys(statuses).length > 0) {
      logger.log(
        'METHOD-REGISTRY',
        'DEBUG',
        `Status before ${methodName}: ${JSON.stringify(statuses)}`
      )
    }
  }

  /**
   * Get all registered method names
   */
  getMethodNames() {
    return Array.from(this.handlers.keys())
  }

  /**
   * Check if a method is registered
   */
  hasMethod(name) {
    return this.handlers.has(name)
  }
}
