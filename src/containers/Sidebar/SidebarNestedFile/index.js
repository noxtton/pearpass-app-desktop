import { useState } from 'react'

import { html } from 'htm/react'
import { colors } from 'pearpass-lib-ui-theme-provider'

import { NestedFile, NestedFileContainer } from './styles'
import { CreateNewCategoryPopupContent } from '../../../components/CreateNewCategoryPopupContent'
import { PopupMenu } from '../../../components/PopupMenu'
import { useRouter } from '../../../context/RouterContext'
import { useCreateOrEditRecord } from '../../../hooks/useCreateOrEditRecord'
import { useRecordMenuItems } from '../../../hooks/useRecordMenuItems'

/**
 * @param {{
 *  icon: () => void,
 *  color: string,
 *  folderName: string,
 *  isNew: boolean,
 *  name: string
 *  id: string
 * }} props
 */
export const SidebarNestedFile = ({
  icon,
  name,
  folderName,
  color = colors.white.mode1,
  isNew = false,
  id
}) => {
  const { navigate, data } = useRouter()

  const [isNewPopupMenuOpen, setIsNewPopupMenuOpen] = useState(false)

  const { popupItems } = useRecordMenuItems()

  const { handleCreateOrEditRecord } = useCreateOrEditRecord()

  const handleNewClick = () => {
    setIsNewPopupMenuOpen(!isNewPopupMenuOpen)
  }

  const handleFileClick = () => {
    navigate('vault', {
      recordType: data.recordType,
      recordId: id
    })
  }

  const handleMenuItemClick = (item) => {
    handleCreateOrEditRecord({
      recordType: item.type,
      selectedFolder: folderName
    })

    setIsNewPopupMenuOpen(false)
  }

  return html`
    <${NestedFileContainer}>
      ${isNew
        ? html`
            <${PopupMenu}
              side="left"
              align="left"
              isOpen=${isNewPopupMenuOpen}
              setIsOpen=${setIsNewPopupMenuOpen}
              content=${html`
                <${CreateNewCategoryPopupContent}
                  menuItems=${popupItems}
                  onClick=${handleMenuItemClick}
                />
              `}
            >
              <${NestedFile} color=${color} onClick=${handleNewClick}>
                <${icon} color=${colors.primary400.mode1} size="14" />
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
