import React, { useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  BrushIcon,
  ButtonLittle,
  FolderIcon,
  KebabMenuIcon,
  StarIcon
} from 'pearpass-lib-ui-react-components'
import { colors } from 'pearpass-lib-ui-theme-provider'

import { RecordDetailsContent } from './RecordDetailsContent/index.js'
import {
  FolderWrapper,
  Fields,
  Header,
  HeaderRight,
  RecordActions,
  Title
} from './styles.js'
import { PopupMenu } from '../../components/PopupMenu'
import { RecordActionsPopupContent } from '../../components/RecordActionsPopupContent'
import { useRouter } from '../../context/RouterContext.js'
import { useCreateOrEditRecord } from '../../hooks/useCreateOrEditRecord.js'
import { useRecordActionItems } from '../../hooks/useRecordActionItems.js'
import { useRecordById } from '../../vault/hooks/useRecordById.js'

export const RecordDetails = () => {
  const { i18n } = useLingui()

  const { currentPage, data: routerData, navigate } = useRouter()

  const { data: record } = useRecordById({
    variables: {
      id: routerData.recordId
    }
  })

  const { handleCreateOrEditRecord } = useCreateOrEditRecord()

  const { actions } = useRecordActionItems({
    excludeTypes: ['select', 'pin']
  })

  const [isOpen, setIsOpen] = useState(false)

  const handleEdit = () => {
    handleCreateOrEditRecord({
      recordType: record?.type,
      initialRecord: record
    })
  }

  const handleCollapseRecordDetails = () => {
    navigate(currentPage, { ...routerData, recordId: '' })
  }

  return html`
    <${React.Fragment}>
      <${Header}>
        <div>
          <${Title}> ${record?.data?.title} <//>
          <${FolderWrapper}>
            ${record.isFavorite
              ? html`
                  <${StarIcon} size="14" color=${colors.grey200.mode1} />
                  ${i18n._('Favourites')}
                `
              : html`
                  <${FolderIcon} size="14" color=${colors.grey200.mode1} />
                  ${record.folder}
                `}
          <//>
        </div>

        <${HeaderRight}>
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
