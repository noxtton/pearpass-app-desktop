import React from 'react'

import { html } from 'htm/react'

import { CardCreateMasterPassword } from './CardCreateMasterPassword'
import { CardLoadVault } from './CardLoadVault'
import { CardNewVaultCredentials } from './CardNewVaultCredentials'
import { CardUnlockPearPass } from './CardUnlockPearPass'
import { CardUnlockVault } from './CardUnlockVault'
import { CardUploadBackupFile } from './CardUploadBackupFile'
import { CardVaultSelect } from './CardVaultSelect'
import { CardVaultActions, PageContainer } from './styles'
import { InitialPageWrapper } from '../../components/InitialPageWrapper'
import { useRouter } from '../../context/RouterContext'

export const WelcomePage = () => {
  const { data } = useRouter()

  const Card = React.useMemo(() => {
    switch (data.state) {
      case 'createMasterPassword':
        return CardCreateMasterPassword
      case 'masterPassword':
        return CardUnlockPearPass
      case 'vaults':
        return CardVaultSelect
      case 'loadVault':
        return CardLoadVault
      case 'uploadBackupFile':
        return CardUploadBackupFile
      case 'vaultPassword':
        return CardUnlockVault
      case 'newVaultCredentials':
        return CardNewVaultCredentials
      default:
        return null
    }
  }, [data.state])

  return html`
    <${InitialPageWrapper} isAuthScreen=${true}>
      <${PageContainer}>
        <${CardVaultActions}>
          <${Card} />
        <//>
      <//>
    <//>
  `
}
