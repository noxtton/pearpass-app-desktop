import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  ButtonPrimary,
  ButtonSecondary
} from 'pearpass-lib-ui-react-components'
import { useCreateVault, useVault, useVaults } from 'pearpass-lib-vault-desktop'

import { LoadVaultModalContent } from '../../containers/Modal/LoadVaultModalContent'
import { useModal } from '../../context/ModalContext'
import { useRouter } from '../../context/RouterContext'
import { Vault } from '../Vault'
import {
  ButtonWrapper,
  CardContainer,
  CardTitle,
  Title,
  VaultsContainer
} from './styles'

export const CardVaultSelect = () => {
  const { i18n } = useLingui()
  const { currentPage, navigate } = useRouter()
  const { setModal } = useModal()

  const { data } = useVaults()

  const { refetch, isVaultProtected } = useVault({
    shouldSkip: true
  })

  const { createVault } = useCreateVault({
    onCompleted: () => {
      navigate('vault', { recordType: 'all' })
    }
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
        <${ButtonPrimary} onClick=${createVault}>
          ${i18n._('Create a new vault')}
        <//>
        <${ButtonSecondary} onClick=${handleLoadVault}>
          ${i18n._('Load a vault')}
        <//>
      <//>
    <//>
  `
}
