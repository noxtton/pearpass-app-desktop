import { html } from 'htm/react'
import { useState, useRef } from 'react'
import { colors } from 'pearpass-lib-ui-theme-provider'
import {
  NestedFile,
  NestedFileContainer,
  NewPopupMenuOpenContainer
} from './styles'
import { CreateNewPopupMenu } from '../CreateNewPopupMenu'
import { useOutsideClick } from '../../hooks/useOutsideClick'

/**
 * @typedef SidebarNestedFileProps
 * @property {() => void} [icon]
 * @property {string} [color]
 * @property {boolean} [isNew]
 * @property {string} [name]
 */

/**
 * @param {SidebarNestedFileProps} props
 */

export const SidebarNestedFile = ({
  icon,
  name,
  color = colors.white.mode1,
  isNew = false
}) => {
  const [isNewPopupMenuOpen, setIsNewPopupMenuOpen] = useState(false)
  const menuRef = useRef(null)

  const handleFileClick = () => {
    if (isNew) {
      setIsNewPopupMenuOpen(!isNewPopupMenuOpen)
    }
  }

  useOutsideClick({
    onOutsideClick: () => {
      setIsNewPopupMenuOpen(false)
    },
    ref: menuRef
  })

  return html`
    <${NestedFileContainer} ref=${menuRef}>
      <${NestedFile} color=${color} onClick=${handleFileClick}>
        <${icon} width=${'14px'} />
        ${name}
      <//>
      ${isNew &&
      isNewPopupMenuOpen &&
      html` <${NewPopupMenuOpenContainer}>
        <${CreateNewPopupMenu} />
      <//>`}
    <//>
  `
}
