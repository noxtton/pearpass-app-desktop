import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { formatDate } from 'pear-apps-utils-date'
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

export const Vault = ({
  vault,
  onClick,
  onShareClick,
  onEditClick,
  onDeleteClick
}) => {
  const { i18n } = useLingui()

  return html`
    <${VaultContainer} onClick=${onClick}>
      <${VaultInfo}>
        <${LockCircleIcon} size="21" />

        <${VaultDescription}>
          <${VaultName}>${vault.id}<//>
          <${VaultDate}>
            ${i18n._('Created')} ${' '}
            ${formatDate(vault.createdAt, 'dd-mm-yyyy', '/')}
          <//>
        <//>
      <//>

      <${VaultActions}>
        ${onShareClick &&
        html`
          <span onClick=${onShareClick}>
            <${ShareIcon} />
          </span>
        `}
        ${onEditClick &&
        html`<span onClick=${onEditClick}> <${BrushIcon} /></span>`}
        ${onDeleteClick &&
        html`<span onClick=${onShareClick}><${DeleteIcon} /></span>`}
      <//>
    <//>
  `
}
