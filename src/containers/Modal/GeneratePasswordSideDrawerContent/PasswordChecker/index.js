import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { HighlightString, NoticeText } from 'pearpass-lib-ui-react-components'
import { isPasswordSafe } from 'pearpass-utils-password-check'

import { PasswordWrapper } from '../styles'
/**
 * @param {{
 *  pass: string
 *  rules: {
 *    specialCharacters: boolean,
 *    characters: number
 *  }
 * }} props
 */
export const PasswordChecker = ({ pass, rules }) => {
  const { i18n } = useLingui()

  const result = isPasswordSafe(pass, {
    includeSpecialChars: rules.specialCharacters,
    length: rules.characters,
    upperCase: false,
    upperCase: false,
    numbers: true
  })
  return html` <${PasswordWrapper}>
    <${HighlightString} text=${pass} />
    ${!result.isSafe
      ? html` <${NoticeText} text=${i18n._('Vulnerable')} type="error" />`
      : html` <${NoticeText} text=${i18n._('Safe')} type="success" />`}
  <//>`
}
