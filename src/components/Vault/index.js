import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  BrushIcon,
  DeleteIcon,
  LockCircleIcon,
  ShareIcon
} from 'pearpass-lib-ui-react-components'

import {
  VaultActions,
  VaultContainer,
  VaultDate,
  VaultDescription,
  VaultInfo,
  VaultName
} from './styles'

export const Vault = ({ vault, onClick }) => {
  const { i18n } = useLingui()

  return html`
    <${VaultContainer} onClick=${onClick}>
      <${VaultInfo}>
        <${LockCircleIcon} size="21" />
        <${VaultDescription}>
          <${VaultName}>${vault.id}<//>
          <${VaultDate}> ${i18n._('Created')} ${vault.createdAt}<//>
        <//>
      <//>
      <${VaultActions}>
        <${ShareIcon} />
        <${BrushIcon} />
        <${DeleteIcon} />
      <//>
    <//>
  `
}
