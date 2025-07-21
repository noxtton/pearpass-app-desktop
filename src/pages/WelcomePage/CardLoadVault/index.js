import os from 'os'

import { useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { ArrowLeftIcon, ButtonLittle } from 'pearpass-lib-ui-react-components'
import { usePair, useVault } from 'pearpass-lib-vault'

import { Header, LoadVaultCard, LoadVaultInput, LoadVaultTitle } from './styles'
import { useRouter } from '../../../context/RouterContext'
import { useToast } from '../../../context/ToastContext'

export const CardLoadVault = () => {
  const { i18n } = useLingui()
  const { navigate } = useRouter()

  const [inviteCode, setInviteCodeId] = useState('')

  const { setToast } = useToast()

  const { refetch, addDevice } = useVault({
    shouldSkip: true
  })

  const { pair, isLoading: isPairing } = usePair()

  const handleChange = (e) => {
    setInviteCodeId(e.target.value)
  }

  const handleLoadVault = async () => {
    try {
      const vaultId = await pair(inviteCode)

      if (!vaultId) {
        throw new Error('Vault ID is empty')
      }

      await refetch(vaultId)

      await addDevice(os.hostname() + ' ' + os.platform() + ' ' + os.release())

      navigate('vault', {
        recordType: 'all'
      })
    } catch {
      setInviteCodeId('')
      setToast({
        message: i18n._('Something went wrong, please check invite code')
      })
    }
  }

  const handleGoBack = () => {
    navigate('welcome', { state: 'vaults' })
  }

  return html` <${LoadVaultCard} isLoading=${isPairing}>
    <${Header}>
      <${ButtonLittle}
        onClick=${handleGoBack}
        variant="secondary"
        startIcon=${ArrowLeftIcon}
      />
      <${LoadVaultTitle}>${i18n._('Load an existing Vault')}<//>
    <//>

    <${LoadVaultInput}
      autoFocus
      placeholder=${i18n._('Insert your code vault...')}
      value=${inviteCode}
      onChange=${handleChange}
      onPaste=${() => {
        setTimeout(() => {
          if (!isPairing) handleLoadVault()
        }, 0)
      }}
      onKeyPress=${(e) => {
        if (e.key === 'Enter' && !isPairing) {
          handleLoadVault()
        }
      }}
    />
  <//>`
}
