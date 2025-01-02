import React from 'react'

import { html } from 'htm/react'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PlusIcon,
  FolderIcon
} from 'pearpass-lib-ui-react-components'
import { colors } from 'pearpass-lib-ui-theme-provider'

import {
  AddIconWrapper,
  NestedFolder,
  NestedFoldersContainer,
  NestedItem
} from './styles'

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
