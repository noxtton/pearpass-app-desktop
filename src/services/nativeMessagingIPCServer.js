import { unlink } from 'fs/promises'
import { platform, tmpdir } from 'os'
import { join } from 'path'

import IPC from 'pear-ipc'

import { COMMAND_DEFINITIONS } from '../shared/commandDefinitions'
import { logger } from '../utils/logger'

/**
 * Returns cross-platform IPC path
 * @param {string} socketName
 * @returns {string}
 */
export const getIpcPath = (socketName) => {
  if (platform() === 'win32') {
    return `\\\\?\\pipe\\${socketName}`
  }
  return join(tmpdir(), `${socketName}.sock`)
}

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
    /** @type {string} */
    this.socketPath = getIpcPath('pearpass-native-messaging')
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
      logger.log(
        'IPC-SERVER',
        'INFO',
        'Starting native messaging IPC server...'
      )

      // Clean up any existing socket file for Unix systems
      if (platform() !== 'win32') {
        try {
          await unlink(this.socketPath)
          logger.log('IPC-SERVER', 'INFO', 'Cleaned up existing socket file')
        } catch (err) {
          // Socket file doesn't exist, which is fine
          if (err.code !== 'ENOENT') {
            logger.log(
              'IPC-SERVER',
              'WARN',
              `Could not clean up socket file: ${err.message}`
            )
          }
        }
      }

      // Use centralized command definitions
      const methods = COMMAND_DEFINITIONS

      // Create handlers for each method
      const handlers = {
        encryptionInit: async () => {
          await this.client.encryptionInit()
          return { initialized: true }
        },

        encryptionGetStatus: async () =>
          await this.client.encryptionGetStatus(),

        encryptionGet: async (params) =>
          await this.client.encryptionGet(params.key),

        encryptionAdd: async (params) => {
          await this.client.encryptionAdd(params.key, params.data)
          return { success: true }
        },

        vaultsInit: async (params) => {
          await this.client.vaultsInit(params.encryptionKey)
          return { initialized: true }
        },

        vaultsGetStatus: async () => await this.client.vaultsGetStatus(),

        vaultsGet: async (params) => await this.client.vaultsGet(params.key),

        vaultsList: async (params) =>
          await this.client.vaultsList(params.filterKey),

        vaultsAdd: async (params) => {
          await this.client.vaultsAdd(params.key, params.vault)
          return { success: true }
        },

        vaultsClose: async () => {
          await this.client.vaultsClose()
          return { success: true }
        },

        activeVaultInit: async (params) =>
          await this.client.activeVaultInit({
            id: params.id,
            encryptionKey: params.encryptionKey
          }),

        activeVaultGetStatus: async () =>
          await this.client.activeVaultGetStatus(),

        activeVaultGet: async (params) =>
          await this.client.activeVaultGet(params.key),

        activeVaultList: async (params) =>
          await this.client.activeVaultList(params.filterKey),

        activeVaultAdd: async (params) => {
          await this.client.activeVaultAdd(params.key, params.data)
          return { success: true }
        },

        activeVaultRemove: async (params) => {
          await this.client.activeVaultRemove(params.key)
          return { success: true }
        },

        activeVaultClose: async () => {
          await this.client.activeVaultClose()
          return { success: true }
        },

        activeVaultCreateInvite: async () =>
          await this.client.activeVaultCreateInvite(),

        activeVaultDeleteInvite: async () => {
          await this.client.activeVaultDeleteInvite()
          return { success: true }
        },

        hashPassword: async (params) =>
          await this.client.hashPassword(params.password),

        encryptVaultKeyWithHashedPassword: async (params) =>
          await this.client.encryptVaultKeyWithHashedPassword(
            params.hashedPassword
          ),

        encryptVaultWithKey: async (params) =>
          await this.client.encryptVaultWithKey(
            params.hashedPassword,
            params.key
          ),

        getDecryptionKey: async (params) => {
          logger.log(
            'IPC-SERVER',
            'INFO',
            `Getting decryption key with params: ${JSON.stringify(params)}`
          )
          const result = await this.client.getDecryptionKey({
            salt: params.salt,
            password: params.password
          })
          logger.log('IPC-SERVER', 'INFO', `Decryption key result: ${result}`)
          return result
        },

        decryptVaultKey: async (params) =>
          await this.client.decryptVaultKey({
            ciphertext: params.ciphertext,
            nonce: params.nonce,
            hashedPassword: params.hashedPassword
          }),

        pair: async (params) => await this.client.pair(params.inviteCode),

        initListener: async (params) => {
          await this.client.initListener({ vaultId: params.vaultId })
          return { success: true }
        },

        closeVault: async () => {
          await this.client.close()
          return { success: true }
        }
      }

      console.log('Creating IPC server... at', this.socketPath)

      // Create IPC server
      this.server = new IPC.Server({
        socketPath: this.socketPath,
        methods: methods,
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

    // Clean up socket file on Unix systems
    if (platform() !== 'win32') {
      try {
        await unlink(this.socketPath)
        logger.log('IPC-SERVER', 'INFO', 'Cleaned up socket file')
      } catch (err) {
        if (err.code !== 'ENOENT') {
          logger.log(
            'IPC-SERVER',
            'WARN',
            `Could not clean up socket file: ${err.message}`
          )
        }
      }
    }

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
