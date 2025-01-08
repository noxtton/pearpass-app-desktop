import React from 'react'

import { html } from 'htm/react'

import { FormGroup } from '../../components/FormGroup'
import { InputFieldNote } from '../../components/InputFieldNote'

/**
 * @param {{
 *  customFields?: {
 *      id: string,
 *      type: 'note',
 *      props: any
 *  }[]
 * }} props
 */
export const CustomFields = ({ customFields }) => {
  return html`
    <${React.Fragment}>
      ${customFields?.map((customField) => {
        if (customField.type === 'note') {
          return html`
            <${FormGroup} key=${customField.id}>
              <${InputFieldNote} ${{ ...customField?.props }} />
            <//>
          `
        }
      })}
    <//>
  `
}
