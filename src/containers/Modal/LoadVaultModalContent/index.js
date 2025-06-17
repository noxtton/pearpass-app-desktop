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

  const { isLoading, refetch, addDevice } = useVault({
    shouldSkip: true,
    onCompleted: (data) => {
      if (data) {
        navigate('vault', {
          recordType: 'all'
        })

        closeModal()
      }
    }
  })

  const { pair } = usePair()

  const handleChange = (e) => {
    setInviteCodeId(e.target.value)
  }

  const handleLoadVault = async () => {
    try {
      const vaultId = await pair(inviteCode)
      if (vaultId) {
        await refetch(vaultId)
        await addDevice(
          os.hostname() + ' ' + os.platform() + ' ' + os.release()
        )
      }
    } catch {
      closeModal()
      setToast({
        message: i18n._('Something went wrong, please check invite code')
      })
    }
  }

  return html` <${LoadVaultCard} isLoading=${isLoading}>
    <${LoadVaultTitle}>${i18n._('Load an existing Vault')}<//>

    <${LoadVaultInput}
      autoFocus
      placeholder=${i18n._('Insert your code vault...')}
      value=${inviteCode}
      onChange=${handleChange}
      onKeyPress=${(e) => {
        if (e.key === 'Enter') {
          handleLoadVault()
        }
      }}
    />
  <//>`
}
