import { useState } from 'react'

import { html } from 'htm/react'
import { colors } from 'pearpass-lib-ui-theme-provider'

import { NestedFile, NestedFileContainer } from './styles'
import { CreateNewPopupMenu } from '../../../components/CreateNewPopupMenu'
import { useCreateOrEditRecord } from '../../../hooks/useCreateOrEditRecord'
import { useRecordMenuItems } from '../../../hooks/useRecordMenuItems'

/**
 * @param {{
 * icon: () => void,
 * color: string,
 * isNew: boolean,
 * name: string
 * }} props
 */
export const SidebarNestedFile = ({
  icon,
  name,
  color = colors.white.mode1,
  isNew = false
}) => {
  const [isNewPopupMenuOpen, setIsNewPopupMenuOpen] = useState(false)

  const menuItems = useRecordMenuItems()

  const { handleCreateOrEditRecord } = useCreateOrEditRecord()

  const handleFileClick = () => {
    if (isNew) {
      setIsNewPopupMenuOpen(!isNewPopupMenuOpen)
    }
  }

  const handleMenuItemClick = (item) => {
    handleCreateOrEditRecord({ recordType: item.type })
    setIsNewPopupMenuOpen(false)
  }

  return html`
    <${NestedFileContainer}>
      ${isNew
        ? html`
            <${CreateNewPopupMenu}
              menuItems=${menuItems}
              side="left"
              align="left"
              isOpen=${isNewPopupMenuOpen}
              setIsOpen=${setIsNewPopupMenuOpen}
              onMenuItemClick=${handleMenuItemClick}
            >
              <${NestedFile} color=${color} onClick=${handleFileClick}>
                <${icon} size="14" />
                ${name}
              <//>
            <//>
          `
        : html` <${NestedFile} color=${color} onClick=${handleFileClick}>
            <${icon} size="14" />
            ${name}
          <//>`}
    <//>
  `
}
