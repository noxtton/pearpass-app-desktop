import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { formatDate } from 'pear-apps-utils-date'
import {
  BrushIcon,
  CheckIcon,
  DeleteIcon,
  LockCircleIcon,
  ShareIcon
} from 'pearpass-lib-ui-react-components'
import { colors } from 'pearpass-lib-ui-theme-provider'

import {
  SelectedVaultIconContainer,
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
  onDeleteClick,
  isSelected
}) => {
  const { i18n } = useLingui()

  const handleClick = () => {
    if (onClick) {
      onClick(vault)
    }
  }

  return html`
    <${VaultContainer} isSelected=${isSelected} onClick=${handleClick}>
      <${VaultInfo}>
        ${isSelected
          ? html` <${SelectedVaultIconContainer}>
              <${CheckIcon} size="21" color=${colors.black.mode1} />
            <//>`
          : html`<${LockCircleIcon} size="21" />`}

        <${VaultDescription}>
          <${VaultName}>${vault.name}<//>
          <${VaultDate}>
            ${i18n._('Created')} ${' '}
            ${!!vault?.createdAt &&
            formatDate(vault.createdAt, 'dd-mm-yyyy', '/')}
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
