import { PearpassVaultClient } from 'pearpass-lib-vault-mobile'

let pearpassClient = null

/**
 * @param {import('pearpass-lib-vault-mobile').PearpassVaultClient} ipc
 * @param {string} storagePath  absolute path where vaults live
 * @param {{ debugMode?: boolean }} opts
 * @returns {PearpassVaultClient}
 */
export function createOrGetPearpassClient(ipc, storagePath, opts = {}) {
  if (!pearpassClient) {
    pearpassClient = new PearpassVaultClient(ipc, storagePath, opts)
  }

  return pearpassClient
}
