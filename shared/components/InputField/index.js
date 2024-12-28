import { html } from 'htm/react'
import {
  InputWrapper,
  MainWrapper,
  Label,
  Input,
  ErrorMessageWrapper,
  ErrorMessage,
  AdditionalItems
} from './styles'
import { ErrorIcon } from '../../../src/svgs/Icons/ErrorIcon'

/**
 * @typedef InputFieldProps
 * @property {string} value input value
 * @property {(e: Event) => void} onChange input change event
 * @property {import('react').FC} Icon icon component
 * @property {string} label input label
 * @property {string} error input error message
 * @property {import('react').ReactNode} additionalItems additional items
 */

/**
 * @param {InputFieldProps} props
 */
export const InputFIeld = ({
  value,
  onChange,
  Icon,
  label,
  error,
  additionalItems,
  placeholder
}) => {
  return html`
    <${InputWrapper}>
      ${!!Icon && html`<${Icon} />`}

      <${MainWrapper}>
        <${Label}> ${label} <//>

        <${Input}
          value=${value}
          onChange=${onChange}
          placeholder=${placeholder}
        />

        ${!!error?.length &&
        html`
          <${ErrorMessageWrapper}>
            <${ErrorIcon} size="10px" />
            <${ErrorMessage}> ${error} <//>
          <//>
        `}
      <//>

      ${!!additionalItems &&
      html` <${AdditionalItems}> ${additionalItems} <//> `}
    <//>
  `
}
