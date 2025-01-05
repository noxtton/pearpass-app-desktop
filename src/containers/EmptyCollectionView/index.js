import { useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { ButtonCreate } from 'pearpass-lib-ui-react-components'

import {
  CollectionsContainer,
  CollectionsTitle,
  SearchContainer,
  Wrapper
} from './styles'
import { ButtonPlusCreateNew } from '../../components/ButtonPlusCreateNew'
import { CreateNewPopupMenu } from '../../components/CreateNewPopupMenu'
import { InputSearch } from '../../components/InputSearch'
import { RECORD_ICON_BY_TYPE } from '../../constants/recordIconByType'
import { useRouter } from '../../context/RouterContext'
import { useCreateOrEditRecord } from '../../hooks/useCreateOrEditRecord'
import { useRecordMenuItems } from '../../hooks/useRecordMenuItems'

export const EmptyCollectionView = () => {
  const { i18n } = useLingui()
  const { data } = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = useRecordMenuItems()

  const { handleCreateOrEditRecord } = useCreateOrEditRecord()

  const createCollectionOptions = [
    { text: i18n._('Create a login'), type: 'login' },
    { text: i18n._('Create an identity'), type: 'identity' },
    {
      text: i18n._('Create a credit card'),
      type: 'creditCard'
    },
    { text: i18n._('Create a note'), type: 'note' },
    { text: i18n._('Create a custom element'), type: 'custom' }
  ]

  const handleMenuItemClick = (item) => {
    handleCreateOrEditRecord({ recordType: item.type })
    setIsOpen(false)
  }

  return html`
    <${Wrapper}>
      <${SearchContainer}>
        <${InputSearch} />
        <${CreateNewPopupMenu}
          isOpen=${isOpen}
          setIsOpen=${setIsOpen}
          menuItems=${menuItems}
          onMenuItemClick=${handleMenuItemClick}
        >
          <${ButtonPlusCreateNew} isOpen=${isOpen} />
        <//>
      <//>
      <${CollectionsContainer}>
        <${CollectionsTitle}>
          <span> ${i18n._('This collection is empty.')}</span>
          <p>${i18n._('Create a new element or pass to another collection')}</p>
        <//>
        ${createCollectionOptions
          .filter(
            (option) =>
              data.recordType === 'all' || option.type === data.recordType
          )
          .map(
            (option) => html`
              <${ButtonCreate}
                startIcon=${RECORD_ICON_BY_TYPE[option.type]}
                onClick=${() =>
                  handleCreateOrEditRecord({ recordType: option.type })}
              >
                ${option.text}
              <//>
            `
          )}
      <//>
    <//>
  `
}
