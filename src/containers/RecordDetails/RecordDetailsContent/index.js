import { html } from 'htm/react'

import { CreditCardDetailsForm } from '../CreditCardDetailsForm'
import { CustomDetailsForm } from '../CustomDetailsForm'
import { IdentityDetailsForm } from '../IdentityDetailsForm'
import { LoginRecordDetailsForm } from '../LoginRecordDetailsForm'
import { NoteDetailsForm } from '../NoteDetailsForm'

/**
 * @param {{
 *   record: {
 *      type: 'note' | 'creditCard' | 'custom' | 'identity' | 'login'
 *    }
 *  selectedFolder?: string
 * }} props
 */
export const RecordDetailsContent = ({ record, selectedFolder }) => {
  if (record?.type === 'creditCard') {
    return html`<${CreditCardDetailsForm}
      initialRecord=${record}
      selectedFolder=${selectedFolder}
    />`
  }
  if (record?.type === 'custom') {
    return html`<${CustomDetailsForm}
      initialRecord=${record}
      selectedFolder=${selectedFolder}
    />`
  }
  if (record?.type === 'identity') {
    return html`<${IdentityDetailsForm}
      initialRecord=${record}
      selectedFolder=${selectedFolder}
    />`
  }
  if (record?.type === 'login') {
    return html`<${LoginRecordDetailsForm}
      initialRecord=${record}
      selectedFolder=${selectedFolder}
    />`
  }
  if (record?.type === 'note') {
    return html`<${NoteDetailsForm}
      initialRecord=${record}
      selectedFolder=${selectedFolder}
    />`
  }
}
