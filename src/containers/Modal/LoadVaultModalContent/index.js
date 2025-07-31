import os from 'os'

import { useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { usePair, useVault } from 'pearpass-lib-vault'

import { LoadVaultCard, LoadVaultInput, LoadVaultTitle } from './styles'
import { useModal } from '../../../context/ModalContext'
import { useRouter } from '../../../context/RouterContext'
import { useToast } from '../../../context/ToastContext'

export const LoadVaultModalContent = () => {
  const { i18n } = useLingui()
  const { navigate } = useRouter()
  const { closeModal } = useModal()

  const [inviteCode, setInviteCodeId] = useState('')

  const { setToast } = useToast()

  const { refetch, addDevice } = useVault({
    shouldSkip: true
  })

  const { pairActiveVault, isLoading: isPairing } = usePair()

  const handleChange = (e) => {
    setInviteCodeId(e.target.value)
  }

  const handleLoadVault = async () => {
    try {
      const vaultId = await pairActiveVault(inviteCode)

      if (!vaultId) {
        throw new Error('Vault ID is empty')
      }

      await refetch(vaultId)

      await addDevice(os.hostname() + ' ' + os.platform() + ' ' + os.release())

      navigate('vault', {
        recordType: 'all'
      })

      closeModal()
    } catch {
      closeModal()

      setToast({
        message: i18n._('Something went wrong, please check invite code')
      })
    }
  }

  return html` <${LoadVaultCard} isLoading=${isPairing}>
    <${LoadVaultTitle}>${i18n._('Load an existing Vault')}<//>

    <${LoadVaultInput}
      autoFocus
      placeholder=${i18n._('Insert your code vault...')}
      value=${inviteCode}
      onChange=${handleChange}
      onKeyPress=${(e) => {
        if (e.key === 'Enter' && !isPairing) {
          handleLoadVault()
        }
      }}
    />
  <//>`
}
