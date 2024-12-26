import { html } from 'htm/react'
import { useState } from 'react'
import {
  AddNewFile,
  LowLevelNestedItemContainer,
  NestedFile,
  NestedFolder,
  NestedFoldersContainer,
  NestedFoldersWrapper,
  NestedItem,
  NestedItemName
} from './styles'
import { ArrowDownIcon } from '../../svgs/Icons/ArrowDownIcon'
import { ArrowUpIcon } from '../../svgs/Icons/ArrowUpIcon'
import { FolderIcon } from '../../svgs/Icons/FolderIcon'
import { PlusIcon } from '../../svgs/Icons/PlusIcon'

export const SidebarNestedFolders = ({ item, level = 0, isRoot = true }) => {
  const [isOpen, setIsOpen] = useState(false)
  const isFolder = 'children' in item

  if (!isFolder) {
    return html`
      <${NestedFile}>
        <${item.icon} width=${'14px'} />
        ${item.name}
      <//>
    `
  }

  return html`
    <${NestedFoldersWrapper}>
      <${NestedFoldersContainer}>
        <${NestedItem} onClick=${() => setIsOpen(!isOpen)}>
          <div>
            ${isOpen
              ? html`
                  <${ArrowDownIcon} width=${'14px'} />
                `
              : html`
                  <${ArrowUpIcon} width=${'14px'} />
                `}
          </div>

          <${NestedFolder}>
            ${!isRoot &&
            html`
              <${FolderIcon} width=${'14px'} />
            `}

            <${NestedItemName}>${item.name}<//>
          <//>
        <//>

        ${isRoot &&
        html`
          <${PlusIcon} width=${'14px'} />
        `}
      <//>

      ${isOpen &&
      html`
        <${LowLevelNestedItemContainer} level=${level}>
          ${item.children.map(
            (item) => html`
              <${SidebarNestedFolders}
                item=${item}
                isRoot=${false}
                level=${level + 1}
              />
            `
          )}
        <//>

        ${!isRoot &&
        html`
          <${AddNewFile}>
            <${PlusIcon} width=${'14px'} />
            New
          <//>
        `}
      `}
    <//>
  `
}
