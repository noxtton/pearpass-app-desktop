import { useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'

import { LoadVaultCard, LoadVaultInput, LoadVaultTitle } from './styles'
import { useModal } from '../../../context/ModalContext'
import { useRouter } from '../../../context/RouterContext'
import { useVault } from '../../../vault/hooks/useVault'

export const LoadVaultModalContent = () => {
  const { i18n } = useLingui()
  const { navigate } = useRouter()
  const { closeModal } = useModal()

  const [vaultId, setVaultId] = useState('')

  const { refetch, isLoading } = useVault({
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

  const handleChange = (e) => {
    setVaultId(e.target.value)
  }

  const handleLoadVault = () => {
    refetch(vaultId)
  }

  return html` <${LoadVaultCard} isLoading=${isLoading}>
    <${LoadVaultTitle}>${i18n._('Load an existing Vault')}<//>

    <${LoadVaultInput}
      autoFocus
      placeholder=${i18n._('Insert your code vault...')}
      value=${vaultId}
      onChange=${handleChange}
      onKeyPress=${(e) => {
        if (e.key === 'Enter') {
          handleLoadVault()
        }
      }}
    />
  <//>`
}
