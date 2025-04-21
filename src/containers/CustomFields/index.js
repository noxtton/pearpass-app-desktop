import React from 'react'

import { html } from 'htm/react'
import { ButtonLittle, DeleteIcon } from 'pearpass-lib-ui-react-components'

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
 *  removeItem?: () => void
 * }} props
 */
export const CustomFields = ({
  customFields,
  register,
  areInputsDisabled,
  removeItem,
  onClick
}) => html`
  <${React.Fragment}>
    ${customFields?.map((customField, index) => {
      if (customField.type === 'note') {
        return html`
          <${FormGroup} key=${customField.id}>
            <${InputFieldNote}
              onClick=${onClick}
              isDisabled=${areInputsDisabled}
              additionalItems=${!areInputsDisabled &&
              html`
                <${ButtonLittle}
                  variant="secondary"
                  startIcon=${DeleteIcon}
                  onClick=${() => removeItem?.(index)}
                />
              `}
              ...${register('note', index)}
            />
          <//>
        `
      }
    })}
  <//>
`
