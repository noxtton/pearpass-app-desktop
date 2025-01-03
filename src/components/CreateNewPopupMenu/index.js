import { html } from 'htm/react'

import {
  MenuItem,
  MenuList,
  MenuCard,
  MenuWrapper,
  MenuTrigger
} from './styles'
import { useOutsideClick } from '../../hooks/useOutsideClick'

/**
 * @param {{
 *  isOpen: boolean,
 *  setIsOpen: () => void,
 *  menuItems: Array<{
 *   icon: any,
 *   name: string,
 *   color: string
 *  }>,
 *  buttonAnchor: 'left' | 'center' | 'right',
 *  menuAnchor: 'left' | 'center' | 'right',
 *  gap: number
 * }} props
 */

export const CreateNewPopupMenu = ({
  isOpen,
  setIsOpen,
  menuItems,
  children,
  side = 'right',
  align = 'right',
  gap = 10
}) => {
  const menuRef = useOutsideClick({
    onOutsideClick: () => {
      setIsOpen(false)
    }
  })
  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return html`
    <${MenuWrapper} ref=${menuRef}>
      <${MenuTrigger} onClick=${handleToggle}>${children}<//>
      ${isOpen &&
      html` <${MenuCard} side=${side} align=${align} gap=${gap}>
        <${MenuList}>
          ${menuItems.map(
            (item) =>
              html`<${MenuItem} color=${item.color} key=${item.name}>
                <${item.icon} size="14" color=${item.color} />
                ${item.name}
              <//>`
          )}
        <//>
      <//>`}
    <//>
  `
}
