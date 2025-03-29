import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  ButtonPrimary,
  ButtonSecondary
} from 'pearpass-lib-ui-react-components'
import { useVaults } from 'pearpass-lib-vault'

import {
  ButtonWrapper,
  CardContainer,
  CardTitle,
  Title,
  VaultsContainer
} from './styles'
import { Vault } from '../../../components/Vault'
import { LoadVaultModalContent } from '../../../containers/Modal/LoadVaultModalContent'
import { useModal } from '../../../context/ModalContext'
import { useRouter } from '../../../context/RouterContext'

export const CardVaultSelect = () => {
  const { i18n } = useLingui()
  const { currentPage, navigate } = useRouter()
  const { setModal } = useModal()

  const { data } = useVaults()

  const handleLoadVault = () => {
    setModal(html` <${LoadVaultModalContent} /> `, { overlayType: 'blur' })
  }

  const handleSelectVault = async (vaultId) => {
    navigate(currentPage, { state: 'vaultPassword', vaultId: vaultId })
  }

  const handleCreateNewVault = () => {
    navigate(currentPage, { state: 'newVaultCredentials' })
  }

  return html`
    <${CardContainer}>
      <${CardTitle}>
        <${Title}>
          ${i18n._('Select a vault, create a new one or load another one')}
        <//>
      <//>

      <${VaultsContainer}>
        ${data.map(
          (vault) =>
            html`<${Vault}
              onClick=${() => handleSelectVault(vault.id)}
              vault=${vault}
            />`
        )}
      <//>

      <${ButtonWrapper}>
        <${ButtonPrimary} onClick=${handleCreateNewVault}>
          ${i18n._('Create a new vault')}
        <//>
        <${ButtonSecondary} onClick=${handleLoadVault}>
          ${i18n._('Load a vault')}
        <//>
      <//>
    <//>
  `
}
