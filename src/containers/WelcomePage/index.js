import React from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'

import { CardVaultActions, PageContainer, PearHand, Title } from './styles'
import { CardCreateOrLoadVault } from '../../components/CardCreateOrLoadVault'
import { CardUnlockPearPass } from '../../components/CardUnlockPearPass'
import { CardUnlockVault } from '../../components/CardUnlockVault'
import { CardVaultSelect } from '../../components/CardVaultSelect'
import { InitialPageWrapper } from '../../components/InitialPageWrapper'
import { useRouter } from '../../context/RouterContext'

export const WelcomePage = () => {
  const { i18n } = useLingui()
  const { data } = useRouter()

  const Card = React.useMemo(() => {
    switch (data.state) {
      case 'masterPassword':
        return CardUnlockPearPass
      case 'vaults':
        return CardVaultSelect
      case 'vaultPassword':
        return CardUnlockVault
      default:
        return CardCreateOrLoadVault
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
