// TODO improve types

/* eslint-disable */

declare module 'pearpass-lib-ui-theme-provider' {
  export const ThemeProvider: any
  export const colors: any
  export const themes: any
}

declare module 'pearpass-lib-vault' {
  export const setPearpassVaultClient: any
  export const VaultProvider: any
  export const useVaults: any
  export const useVault: any
  export const useInvite: any
  export const usePair: any
  export const authoriseCurrentProtectedVault: any
  export const RECORD_TYPES: any
  const otherExports: any
  export default otherExports

  export const useUserData: () => {
    data: {
      hasPasswordSet: boolean
      isLoggedIn: boolean
      isVaultOpen: boolean
      masterPasswordStatus: {
        isLocked: boolean
        lockoutRemainingMs: number
        remainingAttempts: number
      }
    }
    isInitialized: boolean
    hasPasswordSet: boolean
    masterPasswordStatus: {
      isLocked: boolean
      lockoutRemainingMs: number
      remainingAttempts: number
    }
    isLoading: boolean
    logIn: (params: {
      ciphertext?: string
      nonce?: string
      salt?: string
      hashedPassword?: string
      password?: string
    }) => Promise<void>
    createMasterPassword: (password: string) => Promise<{
      ciphertext: string
      nonce: string
      salt: string
      hashedPassword: string
    }>
    updateMasterPassword: (params: {
      newPassword: string
      currentPassword: string
    }) => Promise<{
      ciphertext: string
      nonce: string
      salt: string
      hashedPassword: string
    }>
    refetch: () => Promise<{
      hasPasswordSet: boolean
      isLoggedIn: boolean
      isVaultOpen: boolean
    }>
    refreshMasterPasswordStatus: () => Promise<{
      isLocked: boolean
      lockoutRemainingMs: number
      remainingAttempts: number
    }>
  }
}
