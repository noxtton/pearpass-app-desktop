import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  ButtonPrimary,
  ButtonSecondary
} from 'pearpass-lib-ui-react-components'
import { useCreateVault } from 'pearpass-lib-vault'

import { Vault } from '../Vault'
import {
  ButtonWrapper,
  CardContainer,
  CardTitle,
  Title,
  VaultsContainer
} from './styles'
import { LoadVaultModalContent } from '../../containers/Modal/LoadVaultModalContent'
import { useModal } from '../../context/ModalContext'
import { useRouter } from '../../context/RouterContext'

const MOCK_DATA_VAULTS = [
  { name: 'Personal', createdAt: '10/12/2024' },
  { name: 'Work', createdAt: '10/12/2024' }
]

export const CardVaultSelect = () => {
  const { i18n } = useLingui()
  const { currentPage, navigate } = useRouter()
  const { setModal } = useModal()

  const { createVault } = useCreateVault({
    onCompleted: () => {
      navigate('vault', { recordType: 'all' })
    }
  })

  const handleLoadVault = () => {
    setModal(html` <${LoadVaultModalContent} /> `, { overlayType: 'blur' })
  }

  const handleSelectVault = () => {
    navigate(currentPage, { state: 'vaultPassword' })
  }

  return html`
    <${CardContainer}>
      <${CardTitle}>
        <${Title}>
          ${i18n._('Select a vault, create a new one or load another one')}
        <//>
      <//>

      <${VaultsContainer}>
        ${MOCK_DATA_VAULTS.map(
          (vault) =>
            html`<${Vault} onClick=${handleSelectVault} vault=${vault} />`
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
