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

  const { isLoading, refetch } = useVault({
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

  const { pair } = usePair({
    onCompleted: (vault) => {
      if (vault?.id) {
        refetch(vault?.id)
      }
    },
    onError: () => {
      closeModal()
      setToast({
        message: i18n._('Something went wrong, please check invite code')
      })
    }
  })

  const handleChange = (e) => {
    setInviteCodeId(e.target.value)
  }

  const handleLoadVault = async () => {
    await pair(inviteCode)
  }

  return html` <${LoadVaultCard} isLoading=${isLoading}>
    <${LoadVaultTitle}>${i18n._('Vault Name')}<//>

    <${LoadVaultInput}
      autoFocus
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
