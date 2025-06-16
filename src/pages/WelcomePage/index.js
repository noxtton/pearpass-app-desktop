import React from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'

import { CardCreateMasterPassword } from './CardCreateMasterPassword'
import { CardNewVaultCredentials } from './CardNewVaultCredentials'
import { CardUnlockPearPass } from './CardUnlockPearPass'
import { CardUnlockVault } from './CardUnlockVault'
import { CardVaultSelect } from './CardVaultSelect'
import { CardVaultActions, PageContainer, PearHand, Title } from './styles'
import { InitialPageWrapper } from '../../components/InitialPageWrapper'
import { useRouter } from '../../context/RouterContext'

export const WelcomePage = () => {
  const { i18n } = useLingui()
  const { data } = useRouter()

  const Card = React.useMemo(() => {
    switch (data.state) {
      case 'createMasterPassword':
        return CardCreateMasterPassword
      case 'masterPassword':
        return CardUnlockPearPass
      case 'vaults':
        return CardVaultSelect
      case 'vaultPassword':
        return CardUnlockVault
      case 'newVaultCredentials':
        return CardNewVaultCredentials
      default:
        return null
    }
  }, [data.state])

  return html`
    <${InitialPageWrapper}>
      <${PageContainer}>
        <${Title}>${i18n._('Hi Peer! Welcome to PearPass!')}<//>

        <${CardVaultActions}>
          <${Card} />
        <//>

        <${PearHand} src="assets/images/pearHandBig.png" alt="pearHand" />
      <//>
    <//>
  `
}
