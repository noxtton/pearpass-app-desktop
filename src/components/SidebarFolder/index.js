import { html } from 'htm/react'
import {
  AddIconWrapper,
  NestedFolder,
  NestedFoldersContainer,
  NestedItem
} from './styles'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PlusIcon,
  FolderIcon
} from 'pearpass-lib-ui-react-components'
import React from 'react'
import { colors } from 'pearpass-lib-ui-theme-provider'

/**
 * @typedef SidebarFolderProps
 * @property {boolean} [isOpen]
 * @property {boolean} [isRoot]
 * @property {() => void} [onClick]
 * @property {string} [name]
 * @property {() => void} [onAddClick]
 */

/**
 * @param {SidebarFolderProps} props
 */

export const SidebarFolder = ({
  isOpen,
  onClick,
  onAddClick,
  isRoot,
  name
}) => {
  return html`
    <${React.Fragment}>
      <${NestedFoldersContainer}>
        <${NestedItem} onClick=${onClick}>
          <div>
            <${isOpen ? ArrowDownIcon : ArrowUpIcon} ArrowUpIcon="14" />
          </div>

          <${NestedFolder}>
            ${!isRoot && html` <${FolderIcon} size="14" /> `}

            <span>${name}</span>
          <//>
        <//>

        ${isRoot &&
        html`
          <${AddIconWrapper} onClick=${() => onAddClick()}>
            <${PlusIcon} color=${colors.primary400.option2} size="14" />
          <//>
        `}
      <//>
    <//>
  `
}
