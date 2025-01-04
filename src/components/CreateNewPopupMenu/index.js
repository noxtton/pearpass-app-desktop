import { html } from 'htm/react'

import {
  MenuItem,
  MenuList,
  MenuCard,
  MenuWrapper,
  MenuTrigger
} from './styles'
import { RECORD_COLOR_BY_TYPE } from '../../constants/recordColorByTYpe'
import { RECORD_ICON_BY_TYPE } from '../../constants/recordIconByType'
import { useOutsideClick } from '../../hooks/useOutsideClick'

/**
 * @param {{
 *  isOpen: boolean,
 *  setIsOpen: () => void,
 *  menuItems: Array<{
 *   type: string,
 *   name: string,
 *  }>,
 *  side: 'left' | 'center' | 'right',
 *  align: 'left' | 'center' | 'right',
 * }} props
 */
export const CreateNewPopupMenu = ({
  isOpen,
  setIsOpen,
  menuItems,
  children,
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
      html` <${MenuCard} side=${side} align=${align}>
        <${MenuList}>
          ${menuItems.map(
            (item) =>
              html`<${MenuItem}
                color=${RECORD_COLOR_BY_TYPE[item.type]}
                key=${item.id}
              >
                <${RECORD_ICON_BY_TYPE[item.type]}
                  size="14"
                  color=${RECORD_COLOR_BY_TYPE[item.type]}
                />

                ${item.name}
              <//>`
          )}
        <//>
      <//>`}
    <//>
  `
}
