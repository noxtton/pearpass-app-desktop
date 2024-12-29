import { html } from 'htm/react'
import {
  InputWrapper,
  MainWrapper,
  Label,
  Input,
  ErrorMessageWrapper,
  ErrorMessage,
  AdditionalItems,
  IconWrapper
} from './styles'
import { ErrorIcon } from '../../../src/svgs/Icons/ErrorIcon'

/**
 * @typedef InputFieldProps
 * @property {string} value input value
 * @property {(e: string) => void} onChange input change event
 * @property {import('react').FC} icon icon component
 * @property {string} label input label
 * @property {string} error input error message
 * @property {import('react').ReactNode} additionalItems additional items
 * @property {string} placeholder input placeholder
 * @property {boolean} isDisabled input disabled
 * @property {'text' | 'password'} type input type
 */

/**
 * @param {InputFieldProps} props
 */
export const InputFIeld = ({
  value,
  onChange,
  icon,
  label,
  error,
  additionalItems,
  placeholder,
  isDisabled,
  type = 'text'
}) => {
  const handleChange = (e) => {
    if (isDisabled) {
      return
    }

    onChange(e.target.value)
  }

  return html`
    <${InputWrapper}>
      ${!!icon && html` <${IconWrapper}> <${icon} size="21" /> <//>`}

      <${MainWrapper}>
        <${Label}> ${label} <//>

        <${Input}
          value=${value}
          onChange=${handleChange}
          placeholder=${placeholder}
          disabled=${isDisabled}
          type=${type}
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
