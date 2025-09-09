import { useLingui } from '@lingui/react'
import { html } from 'htm/react'

import {
  CollectionsContainer,
  CollectionsTitle,
  CollectionsWrapper
} from './styles'
import { RECORD_ICON_BY_TYPE } from '../../constants/recordIconByType'
import { useRouter } from '../../context/RouterContext'
import { useCreateOrEditRecord } from '../../hooks/useCreateOrEditRecord'
import { ButtonCreate } from '../../lib-react-components'

export const EmptyCollectionView = () => {
  const { data } = useRouter()
  const { i18n } = useLingui()

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

  return html`
    <${CollectionsWrapper}>
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
