import { html } from 'htm/react'
import { NestedFolder, NestedFoldersContainer, NestedItem } from './styles'
import { ArrowDownIcon } from '../../svgs/Icons/ArrowDownIcon'
import { ArrowUpIcon } from '../../svgs/Icons/ArrowUpIcon'
import { PlusIcon } from '../../svgs/Icons/PlusIcon'
import { FolderIcon } from '../../svgs/Icons/FolderIcon'
import React from 'react'

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
            ${isOpen
              ? html` <${ArrowDownIcon} width=${'14px'} /> `
              : html` <${ArrowUpIcon} width=${'14px'} /> `}
          </div>

          <${NestedFolder}>
            ${!isRoot && html` <${FolderIcon} width=${'14px'} /> `}

            <span>${name}</span>
          <//>
        <//>

        ${isRoot && html` <${PlusIcon} width=${'14px'} /> `}
      <//>
    <//>
  `
}
