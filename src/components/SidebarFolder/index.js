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
 * @param {{
 *  isOpen: boolean
 *  onClick: () => void
 *  onAddClick: () => void
 *  isRoot: boolean
 *  name: string
 *  icon: string
 * }} props
 */
export const SidebarFolder = ({
  isOpen,
  onClick,
  onDropDown,
  onAddClick,
  isRoot,
  name,
  icon: Icon
}) => {
  const handleDropDownClick = (e) => {
    e.stopPropagation()
    onDropDown()
  }

  return html`
    <${React.Fragment}>
      <${NestedFoldersContainer}>
        <${NestedItem} onClick=${onClick}>
          <div onClick=${handleDropDownClick}>
            <${isOpen ? ArrowDownIcon : ArrowUpIcon} ArrowUpIcon="14" />
          </div>

          <${NestedFolder}>
            ${!isRoot && html` <${Icon ?? FolderIcon} size="14" /> `}

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
