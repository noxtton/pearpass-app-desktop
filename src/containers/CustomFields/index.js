import React from 'react'

import { html } from 'htm/react'

import { FormGroup } from '../../components/FormGroup'
import { InputFieldNote } from '../../components/InputFieldNote'

/**
 * @param {{
 *  register: (name: string, index: number) => any
 *  customFields?: {
 *      id: string
 *      type: 'note'
 *      props: any
 *  }[]
 * }} props
 */
export const CustomFields = ({ customFields, register }) => {
  return html`
    <${React.Fragment}>
      ${customFields?.map((customField, index) => {
        if (customField.type === 'note') {
          return html`
            <${FormGroup} key=${customField.id}>
              <${InputFieldNote} ...${register('note', index)} />
            <//>
          `
        }
      })}
    <//>
  `
}
