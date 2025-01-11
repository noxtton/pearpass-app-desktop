import { useState } from 'react'

import { html } from 'htm/react'
import { KebabMenuIcon } from 'pearpass-lib-ui-react-components'

import {
  RecordActions,
  RecordInformation,
  RecordName,
  RecordWrapper
} from './styles'
import { useRecordActionItems } from '../../hooks/useRecordActionItems'
import { generateAvatarInitials } from '../../utils/generateAvatarInitials'
import { PopupMenu } from '../PopupMenu'
import { RecordActionsPopupContent } from '../RecordActionsPopupContent'
import { RecordAvatar } from '../RecordAvatar'

/**
 *
 * @param {{
 *  record: {
 *    name: string,
 *    avatarSrc: string,
 *    updatedAt: number,
 *    isPinned: boolean
 *  },
 *  isSelected: boolean,
 *  onClick: () => void
 * }} props
 */
export const Record = ({ record, isSelected = false, onClick }) => {
  const [isOpen, setIsOpen] = useState()

  const { actions } = useRecordActionItems()

  const handleActionMenuToggle = (e) => {
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  return html`
    <${RecordWrapper}
      open=${isOpen}
      isSelected=${isSelected}
      onClick=${onClick}
    >
      <${RecordInformation}>
        <${RecordAvatar}
          avatarSrc=${record?.avatarSrc}
          initials=${generateAvatarInitials(record.name)}
          isSelected=${isSelected}
          isPinned=${record.isPinned}
        />

        <${RecordName}>
          <span>${record.name}</span>

          <p>caldarace</p>
        <//>
      <//>

      ${!isSelected &&
      html` <${RecordActions}>
        <${PopupMenu}
          side="right"
          align="right"
          isOpen=${isOpen}
          setIsOpen=${setIsOpen}
          content=${html`
            <${RecordActionsPopupContent} menuItems=${actions} />
          `}
        >
          <div onClick=${handleActionMenuToggle}>
            <${KebabMenuIcon} />
          </div>
        <//>
      <//>`}
    <//>
  `
}
