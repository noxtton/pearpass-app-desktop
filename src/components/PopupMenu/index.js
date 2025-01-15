import { html } from 'htm/react'

import { MenuCard, MenuWrapper, MenuTrigger } from './styles'
import { useOutsideClick } from '../../hooks/useOutsideClick'

/**
 * @param {{
 *  isOpen: boolean,
 *  setIsOpen: () => void,
 *  content: import('react').ReactNode,
 *  children: import('react').ReactNode,
 *  side: 'left' | 'center' | 'right',
 *  align: 'left' | 'center' | 'right'
 * }} props
 */
export const PopupMenu = ({
  isOpen,
  setIsOpen,
  children,
  content,
  side = 'right',
  align = 'right'
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
      html`<${MenuCard} side=${side} align=${align}> ${content} <//>`}
    <//>
  `
}
