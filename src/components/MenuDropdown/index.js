import React, { useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  FolderIcon
} from 'pearpass-lib-ui-react-components'

import {
  DropDown,
  DropDownItem,
  FolderIconWrapper,
  Label,
  MainWrapper,
  Wrapper
} from './styles'
import { useOutsideClick } from '../../hooks/useOutsideClick'

/**
 * @param {{
 *    selectedItem?: {name: string, icon?: import('react').ReactNode},
 *    onItemSelect: (item: {name: string, icon?: import('react').ReactNode}) => void,
 *    items: Array<{name: string, icon?: import('react').ReactNode}>
 *  }} props
 */
export const MenuDropdown = ({ selectedItem, onItemSelect, items }) => {
  const { i18n } = useLingui()

  const [isOpen, setIsOpen] = useState(false)

  const currentItems = React.useMemo(
    () => items.filter((item) => item.name !== selectedItem.name),
    [items, selectedItem]
  )

  const wrapperRef = useOutsideClick({
    onOutsideClick: () => {
      setIsOpen(false)
    }
  })

  const handleFolderSelect = (item) => {
    onItemSelect(item)

    setIsOpen(false)
  }

  const renderDropDownItem = ({ item, onClick }) => {
    return html`
      <${DropDownItem} onClick=${() => onClick?.()}>
        <${FolderIconWrapper}>
          <${item.icon ?? FolderIcon}
            size="14"
            color=${item.color ?? undefined}
          />
        <//>

        ${item.name}
      <//>
    `
  }

  const renderLabel = (isHidden) => {
    return html`
      <${Label} isHidden=${isHidden} onClick=${() => setIsOpen(!isOpen)}>
        <${isOpen ? ArrowUpIcon : ArrowDownIcon} size="14" />

        ${selectedItem.name
          ? renderDropDownItem({ item: selectedItem })
          : i18n._('No folder')}
      <//>
    `
  }

  return html`
    <${MainWrapper} ref=${wrapperRef}>
      ${renderLabel(true)}

      <${Wrapper} isOpen=${isOpen}>
        ${renderLabel()}
        ${isOpen &&
        html`<${DropDown}>
          ${currentItems.map((item) =>
            renderDropDownItem({
              item,
              onClick: () => handleFolderSelect(item)
            })
          )}
        <//>`}
      <//>
    <//>
  `
}
