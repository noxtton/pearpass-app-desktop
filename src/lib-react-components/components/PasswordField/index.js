import React, { useState } from 'react'

import { html } from 'htm/react'
import { isPassphraseSafe, isPasswordSafe } from 'pearpass-utils-password-check'

import { PasswordStrongnessWrapper } from './styles'
import {
  KeyIcon,
  EyeIcon,
  YellowErrorIcon,
  OkayIcon,
  InputField,
  EyeClosedIcon,
  HighlightString,
  ButtonRoundIcon
} from '../../index'

/**
 * @param {{
 *  value: string,
 *  onChange: (value: string) => void,
 *  label: string,
 *  error: string,
 *  passType: 'password' | 'passphrase',
 *  additionalItems: import('react').ReactNode,
 *  belowInputContent: import('react').ReactNode,
 *  placeholder: string,
 *  isDisabled: boolean,
 *  hasStrongness: boolean,
 *  onClick: () => void,
 *  variant?: 'default' | 'outline'
 *  icon: import('react').ReactNode,
 * }} props
 */
export const PasswordField = ({
  value,
  onChange,
  label,
  error,
  passType = 'password',
  additionalItems,
  belowInputContent,
  placeholder,
  isDisabled,
  hasStrongness = false,
  onClick,
  variant = 'default',
  icon
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleChange = (value) => {
    onChange?.(value)
  }

  const getPasswordStrongness = () => {
    if (!value?.length) {
      return null
    }

    const result =
      passType === 'password' ? isPasswordSafe(value) : isPassphraseSafe(value)

    if (result?.isSafe) {
      return html`
        <${PasswordStrongnessWrapper} isStrong>
          <${OkayIcon} />
          Strong
        <//>
      `
    }

    return html`
      <${PasswordStrongnessWrapper}>
        <${YellowErrorIcon} />
        Weak
      <//>
    `
  }

  return html`
    <${InputField}
      label=${label || 'Password'}
      icon=${icon || KeyIcon}
      isDisabled=${isDisabled}
      value=${value}
      overlay=${isPasswordVisible
        ? html` <${HighlightString} text=${value} /> `
        : null}
      onChange=${handleChange}
      onClick=${onClick}
      placeholder=${placeholder}
      error=${error}
      variant=${variant}
      belowInputContent=${belowInputContent}
      additionalItems=${html`
        <${React.Fragment}>
          ${!!hasStrongness && getPasswordStrongness()}

          <${ButtonRoundIcon}
            startIcon=${isPasswordVisible ? EyeClosedIcon : EyeIcon}
            onClick=${(e) => {
              e.stopPropagation()
              setIsPasswordVisible(!isPasswordVisible)
            }}
          />

          ${additionalItems}
        <//>
      `}
      type=${isPasswordVisible ? 'text' : 'password'}
    />
  `
}
