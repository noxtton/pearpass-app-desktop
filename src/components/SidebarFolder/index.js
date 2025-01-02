import React from 'react'

import { html } from 'htm/react'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PlusIcon,
  FolderIcon
} from 'pearpass-lib-ui-react-components'

import { NestedFolder, NestedFoldersContainer, NestedItem } from './styles'

/**
 * @typedef SidebarFolderProps
 * @property {boolean} [isOpen]
 * @property {boolean} [isRoot]
 * @property {() => void} [onClick]
 * @property {string} [name]
 */

/**
 * @param {SidebarFolderProps} props
 */

export const SidebarFolder = ({ isOpen, onClick, isRoot, name }) => {
  return html`
    <${React.Fragment}>
      <${NestedFoldersContainer}>
        <${NestedItem} onClick=${onClick}>
          <div>
            <${isOpen ? ArrowDownIcon : ArrowUpIcon} width="14" />
          </div>

          <${NestedFolder}>
            ${!isRoot && html` <${FolderIcon} width="14" /> `}

            <span>${name}</span>
          <//>
        <//>

        ${isRoot && html` <${PlusIcon} width="14" /> `}
      <//>
    <//>
  `
}
