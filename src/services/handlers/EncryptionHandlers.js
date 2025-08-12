import { logger } from '../../utils/logger'

/**
 * Handles encryption-related IPC operations
 */
export class EncryptionHandlers {
  constructor(client) {
    this.client = client
  }

  async encryptionInit() {
    await this.client.encryptionInit()
    return { initialized: true }
  }

  async encryptionGetStatus() {
    return await this.client.encryptionGetStatus()
  }

  async encryptionGet(params) {
    const result = await this.client.encryptionGet(params.key)
    logger.log('ENCRYPTION-HANDLER', 'DEBUG', `encryptionGet for key: ${params.key}`)
    return result
  }

  async encryptionAdd(params) {
    await this.client.encryptionAdd(params.key, params.data)
    return { success: true }
  }

  async hashPassword(params) {
    return await this.client.hashPassword(params.password)
  }

  async encryptVaultKeyWithHashedPassword(params) {
    return await this.client.encryptVaultKeyWithHashedPassword(params.hashedPassword)
  }

  async encryptVaultWithKey(params) {
    return await this.client.encryptVaultWithKey(params.hashedPassword, params.key)
  }

  async getDecryptionKey(params) {
    logger.log('ENCRYPTION-HANDLER', 'INFO', `Getting decryption key`)
    const result = await this.client.getDecryptionKey({
      salt: params.salt,
      password: params.password
    })
    logger.log('ENCRYPTION-HANDLER', 'INFO', `Decryption key obtained`)
    return result
  }

  async decryptVaultKey(params) {
    logger.log('ENCRYPTION-HANDLER', 'DEBUG', `Decrypting vault key`)
    return await this.client.decryptVaultKey({
      ciphertext: params.ciphertext,
      nonce: params.nonce,
      hashedPassword: params.hashedPassword
    })
  }
}
