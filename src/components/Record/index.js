import { useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { KebabMenuIcon } from 'pearpass-lib-ui-react-components'

import {
  RecordActions,
  RecordInformation,
  RecordName,
  RecordWrapper
} from './styles'
import { RECORD_COLOR_BY_TYPE } from '../../constants/recordColorByType'
import { useRecordActionItems } from '../../hooks/useRecordActionItems'
import { generateAvatarInitials } from '../../utils/generateAvatarInitials'
import { PopupMenu } from '../PopupMenu'
import { RecordActionsPopupContent } from '../RecordActionsPopupContent'
import { RecordAvatar } from '../RecordAvatar'

/**
 *
 * @param {{
 *  record: {
 *    id: string
 *    createdAt: number
 *    updatedAt: number
 *    isPinned: boolean
 *    isFavorite: boolean
 *    vaultId: string
 *    folder: string
 *    type: 'note' | 'creditCard' | 'custom' | 'identity' | 'login'
 *    data: {
 *      title: string
 *      [key: string]: any
 *    }
 *  },
 *  isSelected: boolean,
 *  onClick: () => void
 *  onSelect: () => void
 * }} props
 */
export const Record = ({ record, isSelected = false, onClick, onSelect }) => {
  const { i18n } = useLingui()
  const [isOpen, setIsOpen] = useState()

  const folderName = record?.isFavorite ? i18n._('Favorite') : record?.folder

  const { actions } = useRecordActionItems({
    record,
    onSelect,
    onClose: () => {
      setIsOpen(false)
    }
  })

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
          avatarSrc=${record?.data?.avatarSrc}
          initials=${generateAvatarInitials(record?.data?.title)}
          isSelected=${isSelected}
          isPinned=${record?.isPinned}
          color=${RECORD_COLOR_BY_TYPE[record?.type]}
        />

        <${RecordName}>
          <span>${record?.data?.title}</span>

          <p>${folderName}</p>
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
