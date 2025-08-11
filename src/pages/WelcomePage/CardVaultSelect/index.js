import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  ButtonPrimary,
  ButtonSecondary,
  CommonFileIcon
} from 'pearpass-lib-ui-react-components'
import { colors } from 'pearpass-lib-ui-theme-provider'
import { useVault, useVaults } from 'pearpass-lib-vault'

import {
  ButtonWrapper,
  CardContainer,
  CardTitle,
  ImportContainer,
  ImportText,
  Title,
  VaultsContainer
} from './styles'
import { ListItem } from '../../../components/ListItem'
import { useRouter } from '../../../context/RouterContext'
import { vaultCreatedFormat } from '../../../utils/vaultCreated.js'

export const CardVaultSelect = () => {
  const { i18n } = useLingui()
  const { currentPage, navigate } = useRouter()

  const { data } = useVaults()

  const { isVaultProtected, refetch } = useVault({
    shouldSkip: true
  })

  const handleLoadVault = () => {
    navigate(currentPage, { state: 'loadVault' })
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

  const handleUploadBackupFile = () => {
    navigate(currentPage, { state: 'uploadBackupFile' })
  }

  const hasVaults = data && data.length > 0

  return html`
    <${CardContainer}>
      <${CardTitle}>
        <${Title}>
          ${data.length > 0
            ? i18n._('Select a vault, create a new one or load another one')
            : i18n._('Start with creating a new vault or importing one')}
        <//>
      <//>

      ${hasVaults &&
      html` <${VaultsContainer}>
        ${data.map(
          (vault) =>
            html`<${ListItem}
              onClick=${() => handleSelectVault(vault.id)}
              itemName="${vault.name}"
              itemDateText=${vaultCreatedFormat(vault.createdAt)}
            />`
        )}
      <//>`}

      <${ButtonWrapper}>
        <${ButtonPrimary} onClick=${handleCreateNewVault}>
          ${i18n._('Create a new vault')}
        <//>

        <${ButtonSecondary} onClick=${handleLoadVault}>
          ${i18n._('Load a vault')}
        <//>
      <//>

      <!-- Will be visible when the feature is added-->
      <!-- ${!hasVaults &&
      html`
        <${ImportContainer}>
          ${i18n._('Or')}
          <${CommonFileIcon} size="21" color=${colors.primary400.mode1} />
          <${ImportText} onClick=${handleUploadBackupFile}>
            ${i18n._('import from a backup file')}
          <//>
        <//>
      `} -->
    <//>
  `
}
