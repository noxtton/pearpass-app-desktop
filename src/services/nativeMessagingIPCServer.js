import IPC from 'pear-ipc'
import { tmpdir } from 'os'
import { join } from 'path'
import { COMMAND_DEFINITIONS } from '../shared/commandDefinitions'

import { log } from '../utils/nativeMessagingLogger'

/**
 * Native Messaging IPC Server
 * This server runs in the main desktop app and handles requests from the native messaging bridge
 */
export class NativeMessagingIPCServer {
  constructor(pearpassClient) {
    this.client = pearpassClient
    this.server = null
    this.isRunning = false
    this.socketPath = join(tmpdir(), 'pearpass-native-messaging.sock')
  }

  async start() {
    if (this.isRunning) {
      log("IPC-SERVER", "INFO", 'IPC server is already running')
      return
    }

    try {
      log("IPC-SERVER", "INFO", 'Starting native messaging IPC server...')
      
      // Use centralized command definitions
      const methods = COMMAND_DEFINITIONS

      // Create handlers for each method
      const handlers = {
        encryptionInit: async () => {
          await this.client.encryptionInit()
          return { initialized: true }
        },
        
        encryptionGetStatus: async () => {
          return await this.client.encryptionGetStatus()
        },
        
        encryptionGet: async (params) => {
          return await this.client.encryptionGet(params.key)
        },
        
        encryptionAdd: async (params) => {
          await this.client.encryptionAdd(params.key, params.data)
          return { success: true }
        },
        
        vaultsInit: async (params) => {
          await this.client.vaultsInit(params.encryptionKey)
          return { initialized: true }
        },
        
        vaultsGetStatus: async () => {
          return await this.client.vaultsGetStatus()
        },
        
        vaultsGet: async (params) => {
          return await this.client.vaultsGet(params.key)
        },
        
        vaultsList: async (params) => {
          return await this.client.vaultsList(params.filterKey)
        },
        
        vaultsAdd: async (params) => {
          await this.client.vaultsAdd(params.key, params.vault)
          return { success: true }
        },
        
        vaultsClose: async () => {
          await this.client.vaultsClose()
          return { success: true }
        },
        
        activeVaultInit: async (params) => {
          return await this.client.activeVaultInit({
            id: params.id,
            encryptionKey: params.encryptionKey
          })
        },
        
        activeVaultGetStatus: async () => {
          return await this.client.activeVaultGetStatus()
        },
        
        activeVaultGet: async (params) => {
          return await this.client.activeVaultGet(params.key)
        },
        
        activeVaultList: async (params) => {
          return await this.client.activeVaultList(params.filterKey)
        },
        
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
        
        activeVaultCreateInvite: async () => {
          return await this.client.activeVaultCreateInvite()
        },
        
        activeVaultDeleteInvite: async () => {
          await this.client.activeVaultDeleteInvite()
          return { success: true }
        },
        
        hashPassword: async (params) => {
          return await this.client.hashPassword(params.password)
        },
        
        encryptVaultKeyWithHashedPassword: async (params) => {
          return await this.client.encryptVaultKeyWithHashedPassword(params.hashedPassword)
        },
        
        encryptVaultWithKey: async (params) => {
          return await this.client.encryptVaultWithKey(params.hashedPassword, params.key)
        },
        
        getDecryptionKey: async (params) => {
          log("IPC-SERVER", "INFO", `Getting decryption key with params: ${JSON.stringify(params)}`)
          const result = await this.client.getDecryptionKey({
            salt: params.salt,
            password: params.password
          })
          log("IPC-SERVER", "INFO", `Decryption key result: ${result}`)
          return result
        },
        
        decryptVaultKey: async (params) => {
          return await this.client.decryptVaultKey({
            ciphertext: params.ciphertext,
            nonce: params.nonce,
            hashedPassword: params.hashedPassword
          })
        },
        
        pair: async (params) => {
          return await this.client.pair(params.inviteCode)
        },
        
        initListener: async (params) => {
          await this.client.initListener({ vaultId: params.vaultId })
          return { success: true }
        },
        
        closeVault: async () => {
          await this.client.close()
          return { success: true }
        }
      }

      // Create IPC server
      this.server = new IPC.Server({
        socketPath: this.socketPath,
        methods: methods,
        handlers: handlers
      })

      // Handle new client connections
      this.server.on('client', (client) => {
        log("IPC-SERVER", "INFO", `New IPC client connected: ${client.id}`)
        
        // Track client request count
        let requestCount = 0
        
        // Listen for method calls
        const originalEmit = client.emit.bind(client)
        client.emit = function(event, ...args) {
          if (event.startsWith('method:')) {
            requestCount++
            log("IPC-SERVER", "INFO", `Client ${client.id} calling ${event} (request #${requestCount})`)
          }
          return originalEmit(event, ...args)
        }
        
        client.on('close', () => {
          log("IPC-SERVER", "INFO", `IPC client disconnected: ${client.id} after ${requestCount} requests`)
        })
        
        client.on('error', (error) => {
          log("IPC-SERVER", "INFO", `IPC client error (${client.id}): ${error.message}`)
        })
      })

      this.server.on('error', (error) => {
        log("IPC-SERVER", "INFO", `IPC server error: ${error.message}`)
      })

      // Start listening
      await this.server.ready()
      
      this.isRunning = true
      log("IPC-SERVER", "INFO", `Native messaging IPC server started successfully on ${this.socketPath}`)
    } catch (error) {
      log("IPC-SERVER", "INFO", `Failed to start IPC server: ${error.message}`)
      throw error
    }
  }

  async stop() {
    if (!this.isRunning) {
      return
    }

    log("IPC-SERVER", "INFO", 'Stopping native messaging IPC server...')
    
    if (this.server) {
      await this.server.close()
      this.server = null
    }

    this.isRunning = false
    log("IPC-SERVER", "INFO", 'Native messaging IPC server stopped')
  }
}

let ipcServerInstance = null

/**
 * Start the native messaging IPC server
 * @param {import('pearpass-lib-vault-desktop').PearpassVaultClient} pearpassClient
 * @returns {Promise<NativeMessagingIPCServer>}
 */
export async function startNativeMessagingIPC(pearpassClient) {
  if (ipcServerInstance?.isRunning) {
    log("IPC-SERVER", "INFO", 'Native messaging IPC server is already running')
    return ipcServerInstance
  }

  ipcServerInstance = new NativeMessagingIPCServer(pearpassClient)
  await ipcServerInstance.start()
  
  return ipcServerInstance
}

/**
 * Stop the native messaging IPC server
 */
export async function stopNativeMessagingIPC() {
  if (!ipcServerInstance?.isRunning) {
    log("IPC-SERVER", "INFO", 'Native messaging IPC server is not running')
    return
  }

  await ipcServerInstance.stop()
  ipcServerInstance = null
}

/**
 * Check if native messaging IPC is running
 */
export const isNativeMessagingIPCRunning = () =>
  ipcServerInstance?.isRunning || false

/**
 * Get the socket path for the IPC server
 */
export const getIPCSocketPath = () => 
  ipcServerInstance?.socketPath || join(tmpdir(), 'pearpass-native-messaging.sock')
