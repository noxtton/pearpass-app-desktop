import { logger } from '../../utils/logger'

/**
 * Handles vault-related IPC operations
 */
export class VaultHandlers {
  constructor(client) {
    this.client = client
  }

  async vaultsInit(params) {
    logger.log(
      'VAULT-HANDLER',
      'DEBUG',
      `vaultsInit called with encryptionKey: ${params?.encryptionKey ? 'provided' : 'missing'}`
    )

    // Initialize vaults
    await this.client.vaultsInit(params.encryptionKey)

    return { initialized: true }
  }

  async vaultsGetStatus() {
    return await this.client.vaultsGetStatus()
  }

  async vaultsGet(params) {
    return await this.client.vaultsGet(params.key)
  }

  async vaultsList(params) {
    logger.log(
      'VAULT-HANDLER',
      'DEBUG',
      `vaultsList called with filterKey: ${params?.filterKey}`
    )

    // Check vault status first
    const vaultsStatus = await this.client.vaultsGetStatus()
    logger.log(
      'VAULT-HANDLER',
      'DEBUG',
      `Vaults status before list: ${JSON.stringify(vaultsStatus)}`
    )

    const result = await this.client.vaultsList(params?.filterKey)
    logger.log(
      'VAULT-HANDLER',
      'DEBUG',
      `vaultsList result: ${JSON.stringify(result)}`
    )

    // Also check encryption status
    const encStatus = await this.client.encryptionGetStatus()
    logger.log(
      'VAULT-HANDLER',
      'DEBUG',
      `Encryption status: ${JSON.stringify(encStatus)}`
    )

    return result
  }

  async vaultsAdd(params) {
    await this.client.vaultsAdd(params.key, params.vault || params.data)
    return { success: true }
  }

  async vaultsClose() {
    await this.client.vaultsClose()
    return { success: true }
  }

  async activeVaultInit(params) {
    const result = await this.client.activeVaultInit({
      id: params.id,
      encryptionKey: params.encryptionKey
    })

    // After initializing, also load the vault metadata
    if (result?.success) {
      await this.loadVaultMetadata(params.id)
    }

    return result
  }

  async loadVaultMetadata(vaultId) {
    // Find the vault from the vaults list
    const vaults = await this.client.vaultsList('vault/')
    const vault = vaults?.data?.find((v) => v.id === vaultId)

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
      logger.log(
        'VAULT-HANDLER',
        'DEBUG',
        `Stored vault metadata after init: ${JSON.stringify(vaultData)}`
      )
    }
  }

  async activeVaultGetStatus() {
    return await this.client.activeVaultGetStatus()
  }

  async activeVaultGet(params) {
    return await this.client.activeVaultGet(params.key)
  }

  async activeVaultList(params) {
    const encStatus = await this.client.encryptionGetStatus()
    const vaultsStatus = await this.client.vaultsGetStatus()
    const activeVaultStatus = await this.client.activeVaultGetStatus()

    logger.log(
      'VAULT-HANDLER',
      'DEBUG',
      `Before activeVaultList: ${JSON.stringify({
        encStatus,
        vaultsStatus,
        activeVaultStatus,
        filterKey: params?.filterKey
      })}`
    )

    return await this.client.activeVaultList(params?.filterKey)
  }

  async activeVaultAdd(params) {
    await this.client.activeVaultAdd(params.key, params.data)
    return { success: true }
  }

  async activeVaultRemove(params) {
    await this.client.activeVaultRemove(params.key)
    return { success: true }
  }

  async activeVaultClose() {
    await this.client.activeVaultClose()
    return { success: true }
  }

  async activeVaultCreateInvite() {
    return await this.client.activeVaultCreateInvite()
  }

  async activeVaultDeleteInvite() {
    await this.client.activeVaultDeleteInvite()
    return { success: true }
  }

  async pair(params) {
    return await this.client.pair(params.inviteCode)
  }

  async initListener(params) {
    await this.client.initListener({ vaultId: params.vaultId })
    return { success: true }
  }

  async closeVault() {
    await this.client.close()
    return { success: true }
  }
}
