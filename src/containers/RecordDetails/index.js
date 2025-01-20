import React, { useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  StarIcon,
  BrushIcon,
  KebabMenuIcon,
  UserIcon,
  WorldIcon,
  CommonFileIcon,
  ButtonLittle,
  CompoundField,
  InputField,
  PasswordField,
  CollapseIcon
} from 'pearpass-lib-ui-react-components'
import { colors } from 'pearpass-lib-ui-theme-provider'

import {
  FavoriteWrapper,
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

const MOCK_DATA = {
  userName: 'caldarace',
  password: 'caldce',
  website: 'Google.com',
  websiteUrl: 'https://google.com',
  note: 'Last account'
}

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

  const handleWebsiteClick = () => {
    window.open(MOCK_DATA.websiteUrl, '_blank')
  }

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

          <${FavoriteWrapper}>
            <${StarIcon} size="14" color=${colors.grey200.mode1} />
            ${i18n._('Favourites')}
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
        <${CompoundField} isDisabled>
          <${InputField}
            label=${i18n._('Email or username')}
            value=${MOCK_DATA.userName}
            icon=${UserIcon}
            isDisabled
          />

          <${PasswordField} value=${MOCK_DATA.password} isDisabled />
        <//>

        <${CompoundField} isDisabled>
          <${InputField}
            label=${i18n._('Website')}
            value=${MOCK_DATA.website}
            icon=${WorldIcon}
            type="url"
            onClick=${handleWebsiteClick}
            isDisabled
          />
        <//>

        <${CompoundField} isDisabled>
          <${InputField}
            label=${i18n._('Note')}
            value=${MOCK_DATA.note}
            icon=${CommonFileIcon}
            isDisabled
          />
        <//>
      <//>
    <//>
  `
}
