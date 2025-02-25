import { useMemo, useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  ButtonPrimary,
  PearPassPasswordField
} from 'pearpass-lib-ui-react-components'

import { useModal } from '../../../context/ModalContext'
import { ModalContent } from '../ModalContent'
import {
  VaultsContainer,
  Description,
  Header,
  Title,
  UnlockVaultContainer
} from './styles'
import { FormModalHeaderWrapper } from '../../../components/FormModalHeaderWrapper'
import { Vault } from '../../../components/Vault'

const MOCK_DATA_VAULTS = [
  { name: 'Personal', createdAt: '10/12/2024' },
  { name: 'Work', createdAt: '10/12/2024' }
]

export const SwapVaultModalContent = () => {
  const { i18n } = useLingui()
  const { closeModal } = useModal()

  const [vault, setVault] = useState('')

  const titles = useMemo(() => {
    if (vault?.length) {
      return {
        title: i18n._('Insert Vault’s password'),
        description: i18n._('Unlock with the {vaultName} Vault password', {
          vaultName: vault
        })
      }
    }

    return {
      title: i18n._('Swap Vault'),
      description: i18n._('Select the Vault you want to sign in')
    }
  }, [vault])

  return html` <${ModalContent}
    onClose=${closeModal}
    headerChildren=${html`
      <${FormModalHeaderWrapper}>
        <${Header}>
          <${Title}> ${titles.title} <//>
          <${Description}> ${titles.description}<//>
        <//>
      <//>
    `}
  >
    ${vault?.length
      ? html`
          <${UnlockVaultContainer}>
            <${PearPassPasswordField} />
            <${ButtonPrimary} onClick=${closeModal}> ${i18n._('Submit')} </>
          <//>
        `
      : html` <${VaultsContainer}>
          ${MOCK_DATA_VAULTS.map(
            (vault) =>
              html`<${Vault}
                vault=${vault}
                onClick=${() => setVault(vault.name)}
              />`
          )}
        <//>`}
  <//>`
}
