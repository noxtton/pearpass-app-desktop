import { html } from 'htm/react'
import { InputFIeld } from '../InputField'
import { KeyIcon } from '../../../src/svgs/Icons/keyIcon'
import { EyeIcon } from '../../../src/svgs/Icons/EyeIcon'
import { EyeClosedIcon } from '../../../src/svgs/Icons/EyeClosedIcon'
import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { ButtonSingleInput } from '../ButtonSingleInput'
import { YellowErrorIcon } from '../../../src/svgs/Icons/YellowErrorIcon'
import { OkayIcon } from '../../../src/svgs/Icons/OkayIcon'
import { PasswordStrongnessWrapper } from './styles'

/**
 * @typedef PasswordFieldProps
 * @property {string} value input value
 * @property {(e: string) => void} onChange input change event
 * @property {string} label input label
 * @property {string} error input error message
 * @property {import('react').ReactNode} additionalItems additional items
 * @property {string} placeholder input placeholder
 * @property {boolean} isDisabled input disabled
 */

/**
 * @param {PasswordFieldProps} props
 */
export const PasswordField = ({
  value,
  onChange,
  label,
  error,
  additionalItems,
  placeholder,
  isDisabled
}) => {
  const { i18n } = useLingui()

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleChange = (e) => {
    onChange(e.target.value)
  }

  const getPasswordStrongeness = () => {
    if (value.length < 8) {
      return html`
        <${PasswordStrongnessWrapper}>
          <${YellowErrorIcon} />

          ${i18n._('Weak')}
        <//>
      `
    }

    return html`
      <${PasswordStrongnessWrapper} isStrong>
        <${OkayIcon} />

        ${i18n._('Strong')}
      <//>
    `
  }

  return html`
    <${InputFIeld}
      label=${label || i18n._('Password')}
      icon=${KeyIcon}
      isDisabled=${isDisabled}
      value=${value}
      onChange=${handleChange}
      placeholder=${placeholder}
      error=${error}
      additionalItems=${html`
        <${React.Fragment}>
          ${additionalItems} ${getPasswordStrongeness()}

          <${ButtonSingleInput}
            onClick=${() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <${isPasswordVisible ? EyeClosedIcon : EyeIcon} />
          <//>
        <//>
      `}
      type=${isPasswordVisible ? 'text' : 'password'}
    />
  `
}
