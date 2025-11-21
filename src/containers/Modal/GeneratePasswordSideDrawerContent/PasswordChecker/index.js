import { html } from 'htm/react'
import { getStrengthConfig, isPasswordSafe } from 'pearpass-utils-password-check'
import { useTranslation } from '../../../../hooks/useTranslation'

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
  const { t } = useTranslation()

  const isCurrentPasswordSafe = isPasswordSafe(pass)

  const config = getStrengthConfig(isCurrentPasswordSafe.strength)

  if (!config) {
    return null;
  }

  return html` <${PasswordWrapper}>
    <${HighlightString} text=${pass} />
    <${NoticeText} text=${t(config.text)} type=${config.type} />
  <//>`
}
