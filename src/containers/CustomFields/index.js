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
 *  onClick?: () => void
 *  areInputsDisabled: boolean
 * }} props
 */
export const CustomFields = ({
  customFields,
  register,
  areInputsDisabled,
  onClick
}) => {
  return html`
    <${React.Fragment}>
      ${customFields?.map((customField, index) => {
        if (customField.type === 'note') {
          return html`
            <${FormGroup} key=${customField.id}>
              <${InputFieldNote}
                onClick=${onClick}
                isDisabled=${areInputsDisabled}
                ...${register('note', index)}
              />
            <//>
          `
        }
      })}
    <//>
  `
}
