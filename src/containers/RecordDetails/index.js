import React, { useEffect, useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { generateAvatarInitials } from 'pear-apps-utils-avatar-initials'
import {
  BrushIcon,
  ButtonLittle,
  CollapseIcon,
  FolderIcon,
  KebabMenuIcon,
  StarIcon
} from 'pearpass-lib-ui-react-components'
import { colors } from 'pearpass-lib-ui-theme-provider'
import { useRecordById, useUpdateRecord } from 'pearpass-lib-vault'

import { RecordDetailsContent } from './RecordDetailsContent/index.js'
import {
  Fields,
  FavoriteButtonWrapper,
  FolderWrapper,
  Header,
  HeaderRight,
  RecordActions,
  Title,
  RecordInfo
} from './styles.js'
import { PopupMenu } from '../../components/PopupMenu'
import { RecordActionsPopupContent } from '../../components/RecordActionsPopupContent'
import { RecordAvatar } from '../../components/RecordAvatar/index.js'
import { RECORD_COLOR_BY_TYPE } from '../../constants/recordColorByType.js'
import { useRouter } from '../../context/RouterContext.js'
import { useCreateOrEditRecord } from '../../hooks/useCreateOrEditRecord.js'
import { useRecordActionItems } from '../../hooks/useRecordActionItems.js'

export const RecordDetails = () => {
  const { i18n } = useLingui()

  const [isOpen, setIsOpen] = useState(false)

  const { currentPage, data: routerData, navigate } = useRouter()

  const { data: record } = useRecordById({
    variables: { id: routerData.recordId }
  })

  const { handleCreateOrEditRecord } = useCreateOrEditRecord()
  const { updateFavoriteState } = useUpdateRecord()

  const { actions } = useRecordActionItems({
    excludeTypes: ['select', 'pin'],
    record: record,
    onClose: () => {
      setIsOpen(false)
    }
  })

  const handleEdit = () => {
    handleCreateOrEditRecord({
      recordType: record?.type,
      initialRecord: record
    })
  }

  const handleCollapseRecordDetails = () => {
    navigate(currentPage, { ...routerData, recordId: '' })
  }

  useEffect(() => {
    if (!record) {
      handleCollapseRecordDetails()
    }
  }, [record])

  if (!record) {
    return null
  }

  return html`
    <${React.Fragment}>
      <${Header}>
        <${RecordInfo}>
          <${RecordAvatar}
            avatarSrc=${record?.data?.avatarSrc}
            initials=${generateAvatarInitials(record?.data?.title)}
            isFavorite=${record?.isFavorite}
            color=${RECORD_COLOR_BY_TYPE[record?.type]}
          />
          <div>
            <${Title}> ${record?.data?.title} <//>
            <${FolderWrapper}>
              <${FolderIcon} size="14" color=${colors.grey200.mode1} />
              ${record?.folder}
            <//>
          </div>
        <//>

        <${HeaderRight}>
          <${FavoriteButtonWrapper}
            favorite=${record?.isFavorite}
            onClick=${() =>
              updateFavoriteState(record?.id, !record?.isFavorite)}
          >
            <${StarIcon} size="21" color=${colors.primary400.mode1} />
          <//>

          <${ButtonLittle} startIcon=${BrushIcon} onClick=${handleEdit}>
            ${i18n._('Edit')}
          <//>

          <${RecordActions}>
            <${PopupMenu}
              side="right"
              align="right"
              isOpen=${isOpen}
              setIsOpen=${setIsOpen}
              content=${html`
                <${RecordActionsPopupContent} menuItems=${actions} />
              `}
            >
              <${ButtonLittle} variant="secondary" startIcon=${KebabMenuIcon} />
            <//>
          <//>

          <${ButtonLittle}
            variant="secondary"
            startIcon=${CollapseIcon}
            onClick=${handleCollapseRecordDetails}
          />
        <//>
      <//>
      <${Fields}>
        <${RecordDetailsContent} record=${record} />
      <//>
    <//>
  `
}
