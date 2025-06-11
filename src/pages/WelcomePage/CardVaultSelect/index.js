import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  ButtonPrimary,
  ButtonSecondary
} from 'pearpass-lib-ui-react-components'
import { useVault, useVaults } from 'pearpass-lib-vault'

import {
  ButtonWrapper,
  CardContainer,
  CardTitle,
  Title,
  VaultsContainer
} from './styles'
import { ListItem } from '../../../components/ListItem'
import { LoadVaultModalContent } from '../../../containers/Modal/LoadVaultModalContent'
import { useModal } from '../../../context/ModalContext'
import { useRouter } from '../../../context/RouterContext'

export const CardVaultSelect = () => {
  const { i18n } = useLingui()
  const { currentPage, navigate } = useRouter()
  const { setModal } = useModal()

  const { data } = useVaults()

  const { isVaultProtected, refetch } = useVault({
    shouldSkip: true
  })

  const handleLoadVault = () => {
    setModal(html` <${LoadVaultModalContent} /> `, { overlayType: 'blur' })
  }

  const handleSelectVault = async (vaultId) => {
    const isProtected = await isVaultProtected(vaultId)

    if (isProtected) {
      navigate(currentPage, { state: 'vaultPassword', vaultId: vaultId })

      return
    }

    await refetch(vaultId)

    navigate('vault', { recordType: 'all' })
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
            html`<${ListItem}
              onClick=${() => handleSelectVault(vault.id)}
              item=${vault}
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
