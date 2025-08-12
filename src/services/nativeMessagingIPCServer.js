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
const secureHandlers = {
        // Native Messaging secure channel - identity and pairing
        nmGetAppIdentity: async () => {
          const { getOrCreateIdentity, getFingerprint } = await import(
            './security/appIdentity.js'
          )
          const id = await getOrCreateIdentity(this.client)
          return {
            ed25519PublicKey: id.ed25519PublicKey,
            x25519PublicKey: id.x25519PublicKey,
            fingerprint: getFingerprint(id.ed25519PublicKey)
          }
        },

        nmGetPairingCode: async () => {
          const { getOrCreateIdentity, getPairingCode } = await import(
            './security/appIdentity.js'
          )
          const id = await getOrCreateIdentity(this.client)
          return { pairingCode: getPairingCode(id.ed25519PublicKey) }
        },

        // Placeholders for session establishment (Phase 2)
        nmBeginHandshake: async (params) => {
          const { beginHandshake } = await import('./security/sessionManager.js')
          const { extEphemeralPubB64 } = params || {}
          if (!extEphemeralPubB64) throw new Error('Missing extEphemeralPubB64')
          return await beginHandshake(this.client, extEphemeralPubB64)
        },

        nmFinishHandshake: async (params) => {
          // For now, finalize by validating the session exists
          const { sessionId } = params || {}
          if (!sessionId) throw new Error('Missing sessionId')
          const { getSession } = await import('./security/sessionManager.js')
          if (!getSession(sessionId)) throw new Error('SessionNotFound')
          return { ok: true }
        },

        nmSecureRequest: async (params) => {
          // params: { sessionId, nonceB64, ciphertextB64, seq }
          const { decryptWithSession, recordIncomingSeq, getSession, encryptWithSession } = await import(
            './security/sessionManager.js'
          )
          const { sessionId, nonceB64, ciphertextB64, seq } = params || {}
          if (!sessionId || !nonceB64 || !ciphertextB64)
            throw new Error('InvalidSecurePayload')

          // Replay protection via strictly increasing sequence numbers
          const session = getSession(sessionId)
          if (!session) throw new Error('SessionNotFound')
          recordIncomingSeq(sessionId, seq)

          const nonce = new Uint8Array(Buffer.from(nonceB64, 'base64'))
          const ciphertext = new Uint8Array(Buffer.from(ciphertextB64, 'base64'))
          const plaintext = decryptWithSession(sessionId, nonce, ciphertext)
          const json = JSON.parse(Buffer.from(plaintext).toString('utf8'))
          // json: { method: string, params: object }
          const { method, params: mParams } = json || {}
          logger.log('IPC-SERVER', 'DEBUG', `nmSecureRequest received method: ${method}`, mParams)
          
          if (!method || typeof this.client[method] !== 'function') {
            logger.log('IPC-SERVER', 'ERROR', `Unknown method: ${method}, available methods:`, Object.keys(this.client).filter(k => typeof this.client[k] === 'function'))
            throw new Error('UnknownMethod')
          }
          
          // Debug: Check status before certain operations
          if (method === 'vaultsList' || method === 'activeVaultList' || method === 'vaultsInit') {
            const encStatus = await this.client.encryptionGetStatus()
            const vaultsStatus = await this.client.vaultsGetStatus()
            const activeVaultStatus = await this.client.activeVaultGetStatus()
            logger.log('IPC-SERVER', 'DEBUG', `Before ${method}:`, {
              encStatus,
              vaultsStatus, 
              activeVaultStatus,
              params: mParams,
              clientMethods: Object.keys(this.client).filter(k => typeof this.client[k] === 'function').slice(0, 10)
            })
          }
          
          // Special handling for vaultsInit to log the encryption key
          if (method === 'vaultsInit') {
            logger.log('IPC-SERVER', 'DEBUG', `vaultsInit called with encryptionKey:`, mParams?.encryptionKey ? 'provided' : 'missing')
          }
          
          // Dispatch to client method - handle both direct params and nested params object
          let result;
          try {
            // Some methods expect direct params, others expect individual args
            if (method === 'vaultsList' || method === 'activeVaultList') {
              // These methods expect a filterKey parameter (can be undefined)
              result = await this.client[method](mParams?.filterKey)
            } else if (method === 'vaultsInit') {
              // vaultsInit expects encryptionKey parameter
              result = await this.client[method](mParams?.encryptionKey)
            } else if (method === 'encryptionGet') {
              // encryptionGet expects a key parameter
              logger.log('IPC-SERVER', 'DEBUG', `encryptionGet called with key: ${mParams?.key}`)
              result = await this.client[method](mParams?.key)
              logger.log('IPC-SERVER', 'DEBUG', `encryptionGet result:`, result)
            } else if (method === 'encryptionAdd') {
              // encryptionAdd expects key and data parameters
              result = await this.client[method](mParams?.key, mParams?.data)
            } else if (method === 'decryptVaultKey') {
              // decryptVaultKey expects ciphertext, nonce, and hashedPassword
              logger.log('IPC-SERVER', 'DEBUG', `decryptVaultKey called with params:`, mParams)
              result = await this.client[method]({
                ciphertext: mParams?.ciphertext,
                nonce: mParams?.nonce,
                hashedPassword: mParams?.hashedPassword
              })
            } else if (method === 'getDecryptionKey') {
              // getDecryptionKey expects salt and password
              result = await this.client[method]({
                salt: mParams?.salt,
                password: mParams?.password
              })
            } else if (method === 'vaultsAdd') {
              // vaultsAdd expects key and vault/data parameters
              await this.client[method](mParams?.key, mParams?.vault || mParams?.data)
              result = { success: true }
            } else if (method === 'vaultsGet') {
              // vaultsGet expects a key parameter
              result = await this.client[method](mParams?.key)
            } else if (method === 'activeVaultInit') {
              // activeVaultInit expects id and encryptionKey parameters
              result = await this.client[method]({
                id: mParams?.id,
                encryptionKey: mParams?.encryptionKey
              })
              
              // After initializing, also load the vault metadata
              if (result?.success) {
                // Find the vault from the vaults list
                const vaults = await this.client.vaultsList('vault/')
                const vault = vaults?.data?.find(v => v.id === mParams?.id)
                if (vault) {
                  // Store the vault metadata in active vault storage
                  const vaultData = {
                    id: vault.id,
                    name: vault.name,
                    version: vault.version,
                    records: vault.records || [],
                    devices: vault.devices || [],
                    createdAt: vault.createdAt,
                    updatedAt: vault.updatedAt
                  }
                  await this.client.activeVaultAdd('vault', vaultData)
                  logger.log('IPC-SERVER', 'DEBUG', 'Stored vault metadata after init:', vaultData)
                }
              }
            } else if (method === 'activeVaultGet') {
              // activeVaultGet expects a key parameter
              result = await this.client[method](mParams?.key)
            } else if (typeof mParams === 'object' && mParams !== null) {
              // For methods with object params, pass the whole object
              result = await this.client[method](mParams)
            } else {
              // For methods without params or with single param
              result = await this.client[method](mParams)
            }
          } catch (error) {
            logger.log('IPC-SERVER', 'ERROR', `Error calling ${method}:`, error.message)
            throw error
          }
          
          if (method === 'vaultsList' || method === 'activeVaultList' || method === 'vaultsInit') {
            logger.log('IPC-SERVER', 'DEBUG', `${method} result:`, result)
          }

          // Encrypt response
          const responsePlaintext = Buffer.from(JSON.stringify({ ok: true, result }), 'utf8')
          const enc = encryptWithSession(sessionId, new Uint8Array(responsePlaintext))
          return enc
        },

        nmCloseSession: async (params) => {
          const { sessionId } = params || {}
          if (!sessionId) throw new Error('Missing sessionId')
          const { closeSession } = await import('./security/sessionManager.js')
          closeSession(sessionId)
          return { ok: true }
        },

        // Minimal bootstrap helpers if needed by client UI (not extension)
        encryptionInit: async () => {
          await this.client.encryptionInit()
          return { initialized: true }
        },
        encryptionGetStatus: async () => await this.client.encryptionGetStatus(),
        
        // Availability check - needed before pairing
        checkAvailability: async () => {
          return {
            available: true,
            status: 'running',
            message: 'Desktop app is running'
          }
        }
      }

      // Other application handlers (must be accessed via nmSecureRequest when secure mode is enabled)
      const openHandlers = {
        encryptionGet: async (params) => await this.client.encryptionGet(params.key),
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

        vaultsList: async (params) => {
          logger.log('IPC-SERVER', 'DEBUG', `vaultsList called with params:`, params)
          
          // Check vault status first
          const vaultsStatus = await this.client.vaultsGetStatus()
          logger.log('IPC-SERVER', 'DEBUG', `Vaults status before list:`, vaultsStatus)
          
          const result = await this.client.vaultsList(params.filterKey)
          logger.log('IPC-SERVER', 'DEBUG', `vaultsList result:`, result)
          
          // Also check encryption status
          const encStatus = await this.client.encryptionGetStatus()
          logger.log('IPC-SERVER', 'DEBUG', `Encryption status:`, encStatus)
          
          return result
        },

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

      // Decide which handlers to expose based on secure mode
      // Set to true to require encryption for vault operations
      const requireSecure = true
      const handlers = requireSecure ? secureHandlers : { ...secureHandlers, ...openHandlers }

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
