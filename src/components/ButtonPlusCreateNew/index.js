import { html } from 'htm/react'
import { useState } from 'react'
import { PlusIcon, XIcon } from 'pearpass-lib-ui-react-components'
import { Button, ButtonWrapper } from './styles'
import { colors } from 'pearpass-lib-ui-theme-provider'
import { CreateNewPopupMenu } from '../CreateNewPopupMenu'
import { useOutsideClick } from '../../hooks/useOutsideClick'

/**
 * @param {{
 *    menuItems: Array<{
 *      icon: any,
 *      name: string,
 *      color: string
 *    }>
 * }} props
 */

export const ButtonPlusCreateNew = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false)

  const menuRef = useOutsideClick({
    onOutsideClick: () => {
      setIsOpen(false)
    }
  })

  return html`
    <${ButtonWrapper} ref=${menuRef}>
      <${Button} onClick=${() => setIsOpen(!isOpen)}>
        <${isOpen ? XIcon : PlusIcon} color=${colors.black.mode1} />
        ${isOpen &&
        html`<${CreateNewPopupMenu}
          menuItems=${menuItems}
          gap=${10}
          anchor=${'right'}
          position=${'right'}
        />`}
      <//>
    <//>
  `
}
