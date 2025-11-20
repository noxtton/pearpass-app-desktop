import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { getStrengthConfig, isPasswordSafe } from 'pearpass-utils-password-check'

import { HighlightString, NoticeText } from '../../../../lib-react-components'
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
export const PasswordChecker = ({ pass }) => {
  const { i18n } = useLingui()

  const isCurrentPasswordSafe = isPasswordSafe(pass)

  const config = getStrengthConfig(isCurrentPasswordSafe.strength)

  if (!config) {
    return null;
  }

  return html` <${PasswordWrapper}>
    <${HighlightString} text=${pass} />
    <${NoticeText} text=${i18n._(config.text)} type=${config.type} />
  <//>`
}
