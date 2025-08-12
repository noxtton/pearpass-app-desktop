import IPC from 'pear-ipc'

import { COMMAND_DEFINITIONS } from '../shared/commandDefinitions'
import { logger } from '../utils/logger'
import { SocketManager, getIpcPath } from './ipc/SocketManager'
import { MethodRegistry } from './ipc/MethodRegistry'
import { SecurityHandlers } from './handlers/SecurityHandlers'
import { EncryptionHandlers } from './handlers/EncryptionHandlers'
import { VaultHandlers } from './handlers/VaultHandlers'
import { SecureRequestHandler } from './handlers/SecureRequestHandler'

// Re-export for backward compatibility
export { getIpcPath }

/**
 * IPC server for native messaging bridge communication
 */
export class NativeMessagingIPCServer {
  /**
   * @param {import('pearpass-lib-vault-mobile').PearpassVaultClient} pearpassClient
   */
  constructor(pearpassClient) {
    /** @type {import('pearpass-lib-vault-mobile').PearpassVaultClient} */
    this.client = pearpassClient
    /** @type {import('pear-ipc').Server|null} */
    this.server = null
    /** @type {boolean} */
    this.isRunning = false
    /** @type {SocketManager} */
    this.socketManager = new SocketManager('pearpass-native-messaging')
    /** @type {string} */
    this.socketPath = this.socketManager.getPath()
    /** @type {MethodRegistry} */
    this.methodRegistry = new MethodRegistry()
    /** @type {MethodRegistry} */
    this.secureMethodRegistry = new MethodRegistry()
    
    // Initialize handlers
    this.setupHandlers()
  }

  /**
   * Setup all method handlers
   */
  setupHandlers() {
    // Security handlers
    const securityHandlers = new SecurityHandlers(this.client)
    const encryptionHandlers = new EncryptionHandlers(this.client)
    const vaultHandlers = new VaultHandlers(this.client)
    
    // Register security methods (always available)
    this.methodRegistry.register(
      'nmGetAppIdentity',
      securityHandlers.nmGetAppIdentity.bind(securityHandlers)
    )
    this.methodRegistry.register(
      'nmGetPairingCode',
      securityHandlers.nmGetPairingCode.bind(securityHandlers)
    )
    this.methodRegistry.register(
      'nmBeginHandshake',
      securityHandlers.nmBeginHandshake.bind(securityHandlers)
    )
    this.methodRegistry.register(
      'nmFinishHandshake',
      securityHandlers.nmFinishHandshake.bind(securityHandlers)
    )
    this.methodRegistry.register(
      'nmCloseSession',
      securityHandlers.nmCloseSession.bind(securityHandlers)
    )
    this.methodRegistry.register(
      'checkAvailability',
      securityHandlers.checkAvailability.bind(securityHandlers)
    )
    
    // Register encryption init (needed for bootstrap)
    this.methodRegistry.register(
      'encryptionInit',
      encryptionHandlers.encryptionInit.bind(encryptionHandlers)
    )
    this.methodRegistry.register(
      'encryptionGetStatus',
      encryptionHandlers.encryptionGetStatus.bind(encryptionHandlers)
    )
    
    // Register secure channel handler
    const secureRequestHandler = new SecureRequestHandler(this.client, this.secureMethodRegistry)
    this.methodRegistry.register(
      'nmSecureRequest',
      secureRequestHandler.handle.bind(secureRequestHandler),
      { logLevel: 'DEBUG' }
    )
    
    // Register methods accessible through secure channel
    this.registerSecureMethods(encryptionHandlers, vaultHandlers)
  }

  /**
   * Register methods that are only accessible through the secure channel
   */
  registerSecureMethods(encryptionHandlers, vaultHandlers) {
    // Encryption methods
    this.secureMethodRegistry.register(
      'encryptionGet',
      encryptionHandlers.encryptionGet.bind(encryptionHandlers),
      { logLevel: 'DEBUG' }
    )
    this.secureMethodRegistry.register(
      'encryptionAdd',
      encryptionHandlers.encryptionAdd.bind(encryptionHandlers)
    )
    this.secureMethodRegistry.register(
      'hashPassword',
      encryptionHandlers.hashPassword.bind(encryptionHandlers)
    )
    this.secureMethodRegistry.register(
      'encryptVaultKeyWithHashedPassword',
      encryptionHandlers.encryptVaultKeyWithHashedPassword.bind(encryptionHandlers)
    )
    this.secureMethodRegistry.register(
      'encryptVaultWithKey',
      encryptionHandlers.encryptVaultWithKey.bind(encryptionHandlers)
    )
    this.secureMethodRegistry.register(
      'getDecryptionKey',
      encryptionHandlers.getDecryptionKey.bind(encryptionHandlers)
    )
    this.secureMethodRegistry.register(
      'decryptVaultKey',
      encryptionHandlers.decryptVaultKey.bind(encryptionHandlers),
      { logLevel: 'DEBUG' }
    )
    
    // Vault methods
    this.secureMethodRegistry.register(
      'vaultsInit',
      vaultHandlers.vaultsInit.bind(vaultHandlers),
      { logLevel: 'DEBUG' }
    )
    this.secureMethodRegistry.register(
      'vaultsGetStatus',
      vaultHandlers.vaultsGetStatus.bind(vaultHandlers)
    )
    this.secureMethodRegistry.register(
      'vaultsGet',
      vaultHandlers.vaultsGet.bind(vaultHandlers)
    )
    this.secureMethodRegistry.register(
      'vaultsList',
      vaultHandlers.vaultsList.bind(vaultHandlers),
      { requiresStatus: ['encryption', 'vaults'], logLevel: 'DEBUG' }
    )
    this.secureMethodRegistry.register(
      'vaultsAdd',
      vaultHandlers.vaultsAdd.bind(vaultHandlers)
    )
    this.secureMethodRegistry.register(
      'vaultsClose',
      vaultHandlers.vaultsClose.bind(vaultHandlers)
    )
    this.secureMethodRegistry.register(
      'activeVaultInit',
      vaultHandlers.activeVaultInit.bind(vaultHandlers)
    )
    this.secureMethodRegistry.register(
      'activeVaultGetStatus',
      vaultHandlers.activeVaultGetStatus.bind(vaultHandlers)
    )
    this.secureMethodRegistry.register(
      'activeVaultGet',
      vaultHandlers.activeVaultGet.bind(vaultHandlers)
    )
    this.secureMethodRegistry.register(
      'activeVaultList',
      vaultHandlers.activeVaultList.bind(vaultHandlers),
      { requiresStatus: ['encryption', 'vaults', 'activeVault'], logLevel: 'DEBUG' }
    )
    this.secureMethodRegistry.register(
      'activeVaultAdd',
      vaultHandlers.activeVaultAdd.bind(vaultHandlers)
    )
    this.secureMethodRegistry.register(
      'activeVaultRemove',
      vaultHandlers.activeVaultRemove.bind(vaultHandlers)
    )
    this.secureMethodRegistry.register(
      'activeVaultClose',
      vaultHandlers.activeVaultClose.bind(vaultHandlers)
    )
    this.secureMethodRegistry.register(
      'activeVaultCreateInvite',
      vaultHandlers.activeVaultCreateInvite.bind(vaultHandlers)
    )
    this.secureMethodRegistry.register(
      'activeVaultDeleteInvite',
      vaultHandlers.activeVaultDeleteInvite.bind(vaultHandlers)
    )
    this.secureMethodRegistry.register(
      'pair',
      vaultHandlers.pair.bind(vaultHandlers)
    )
    this.secureMethodRegistry.register(
      'initListener',
      vaultHandlers.initListener.bind(vaultHandlers)
    )
    this.secureMethodRegistry.register(
      'closeVault',
      vaultHandlers.closeVault.bind(vaultHandlers)
    )
  }

  /**
   * @returns {Promise<void>}
   */
  async start() {
    if (this.isRunning) {
      logger.log('IPC-SERVER', 'INFO', 'IPC server is already running')
      return
    }

    try {
      logger.log('IPC-SERVER', 'INFO', 'Starting native messaging IPC server...')

      // Clean up any existing socket file
      await this.socketManager.cleanupSocket()

      // Build handlers from registry
      const handlers = {}
      for (const [name, handler] of this.methodRegistry.handlers) {
        handlers[name] = handler
      }

      logger.log('IPC-SERVER', 'INFO', `Registered ${this.methodRegistry.getMethodNames().length} handlers`)

      // Create IPC server
      this.server = new IPC.Server({
        socketPath: this.socketPath,
        methods: COMMAND_DEFINITIONS,
        handlers: handlers
      })

      // Handle new client connections
      this.server.on('client', (client) => {
        logger.log(
          'IPC-SERVER',
          'INFO',
          `New IPC client connected: ${client.id}`
        )

        // Track client request count
        let requestCount = 0

        // Listen for method calls
        const originalEmit = client.emit.bind(client)
        client.emit = (event, ...args) => {
          if (event.startsWith('method:')) {
            requestCount++
            logger.log(
              'IPC-SERVER',
              'INFO',
              `Client ${client.id} calling ${event} (request #${requestCount})`
            )
          }
          return originalEmit(event, ...args)
        }

        client.on('close', () => {
          logger.log(
            'IPC-SERVER',
            'INFO',
            `IPC client disconnected: ${client.id} after ${requestCount} requests`
          )
        })

        client.on('error', (error) => {
          logger.log(
            'IPC-SERVER',
            'INFO',
            `IPC client error (${client.id}): ${error.message}`
          )
        })
      })

      this.server.on('error', (error) => {
        logger.log('IPC-SERVER', 'INFO', `IPC server error: ${error.message}`)
      })

      // Start listening
      await this.server.ready()

      this.isRunning = true
      logger.log(
        'IPC-SERVER',
        'INFO',
        `Native messaging IPC server started successfully on ${this.socketPath}`
      )
    } catch (error) {
      logger.log(
        'IPC-SERVER',
        'INFO',
        `Failed to start IPC server: ${error.message}`
      )
      throw error
    }
  }

  /**
   * @returns {Promise<void>}
   */
  async stop() {
    if (!this.isRunning) {
      return
    }

    logger.log('IPC-SERVER', 'INFO', 'Stopping native messaging IPC server...')

    if (this.server) {
      await this.server.close()
      this.server = null
    }

    // Clean up socket file
    await this.socketManager.cleanupSocket()

    this.isRunning = false
    logger.log('IPC-SERVER', 'INFO', 'Native messaging IPC server stopped')
  }
}

/** @type {NativeMessagingIPCServer|null} */
let ipcServerInstance = null

/**
 * @param {import('pearpass-lib-vault-mobile').PearpassVaultClient} pearpassClient
 * @returns {Promise<NativeMessagingIPCServer>}
 */
export const startNativeMessagingIPC = async (pearpassClient) => {
  if (ipcServerInstance?.isRunning) {
    logger.log(
      'IPC-SERVER',
      'INFO',
      'Native messaging IPC server is already running'
    )
    return ipcServerInstance
  }

  ipcServerInstance = new NativeMessagingIPCServer(pearpassClient)
  await ipcServerInstance.start()

  return ipcServerInstance
}

/**
 * @returns {Promise<void>}
 */
export const stopNativeMessagingIPC = async () => {
  if (!ipcServerInstance?.isRunning) {
    logger.log(
      'IPC-SERVER',
      'INFO',
      'Native messaging IPC server is not running'
    )
    return
  }

  await ipcServerInstance.stop()
  ipcServerInstance = null
}

/**
 * @returns {boolean}
 */
export const isNativeMessagingIPCRunning = () =>
  ipcServerInstance?.isRunning || false

/**
 * @returns {string}
 */
export const getIPCSocketPath = () =>
  ipcServerInstance?.socketPath ?? getIpcPath('pearpass-native-messaging')
