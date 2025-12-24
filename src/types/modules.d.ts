// TODO: update types
/* eslint-disable @typescript-eslint/no-explicit-any */

declare module 'pearpass-lib-ui-theme-provider' {
  export const ThemeProvider: any
  export const colors: any
  export const themes: any
}

declare module 'pearpass-lib-vault' {
  export interface Vault {
    id: string
    name: string
    createdAt?: string
  }

  export interface UseVaultsResult {
    isLoading: boolean
    isInitialized: boolean
    data: Vault[] | undefined
    refetch: () => Promise<Vault[]>
    initVaults: (params: {
      ciphertext?: string
      nonce?: string
      salt?: string
      hashedPassword?: string
      password?: string
    }) => Promise<void>
    resetState: () => void
  }

  export interface UseVaultResult {
    isLoading: boolean
    isInitialized: boolean
    data: Vault | undefined
    refetch: (
      vaultId?: string,
      params?: {
        password?: string
        ciphertext?: string
        nonce?: string
        hashedPassword?: string
      }
    ) => Promise<Vault | void>
    isVaultProtected: (vaultId: string | undefined) => Promise<boolean>
    addDevice: (deviceName: string) => Promise<void>
    resetState: () => void
    updateUnprotectedVault: (
      vaultId: string,
      vaultUpdate: { name: string; password: string }
    ) => Promise<void>
    updateProtectedVault: (
      vaultId: string,
      vaultUpdate: { name: string; password: string; currentPassword: string }
    ) => Promise<void>
  }

  export const setPearpassVaultClient: any
  export const VaultProvider: any
  export const useUserData: any
  export function useVaults(options?: {
    onCompleted?: (payload: Vault[]) => void
    onInitialize?: (payload: Vault[]) => void
  }): UseVaultsResult
  export function useVault(options?: {
    shouldSkip?: boolean
    variables?: { vaultId: string }
  }): UseVaultResult
  export const useInvite: any
  export const usePair: any
  export const authoriseCurrentProtectedVault: any
  export const RECORD_TYPES: any
  const otherExports: any
  export default otherExports
}
