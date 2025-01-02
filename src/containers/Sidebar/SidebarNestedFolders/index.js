import { useState } from 'react'

import { html } from 'htm/react'
import { PlusIcon } from 'pearpass-lib-ui-react-components'
import { colors } from 'pearpass-lib-ui-theme-provider'

import { NestedFoldersWrapper } from './styles'
import { SidebarFolder } from '../../../components/SidebarFolder'
import { SidebarNestedFile } from '../SidebarNestedFile'

/**
 * @typedef SidebarNestedFoldersProps
 * @property {Record<string,any>} [item]
 * @property {number} [level]
 * @property {boolean} [isRoot]
 */

/**
 * @param {SidebarNestedFoldersProps} props
 */

export const SidebarNestedFolders = ({ item, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false)

  const isRoot = level === 0
  const isFolder = 'children' in item

  if (!isFolder) {
    return html`
      <${SidebarNestedFile}
        icon=${item.icon}
        name=${item.name}
        key=${item.name + item.id + 'file'}
      />
    `
  }

  return html`
    <${NestedFoldersWrapper} level=${level}>
      <${SidebarFolder}
        isOpen=${isOpen}
        onClick=${() => setIsOpen(!isOpen)}
        isRoot=${isRoot}
        name=${item.name}
        key=${item.name + item.id}
      />

      ${isOpen &&
      html`
        ${item.children.map(
          (childItem) => html`
            <${SidebarNestedFolders}
              key=${childItem.name + childItem.id + level}
              item=${childItem}
              level=${level + 1}
            />
          `
        )}
        ${!isRoot &&
        html`
          <${SidebarNestedFile}
            key=${item.id + 'newFile'}
            icon=${PlusIcon}
            name=${'New'}
            isNew=${true}
            color=${colors.primary400.mode1}
          />
        `}
      `}
    <//>
  `
}
