import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { getStrengthConfig, isPassphraseSafe } from 'pearpass-utils-password-check'

import { HighlightString, NoticeText } from '../../../../lib-react-components'
import { PasswordWrapper } from '../styles'

/**
 * @param {{
 *  pass: Array<string>
 *  rules: {
 *   capitalLetters: boolean,
 *   symbols: boolean,
 *   numbers: boolean,
 *   words: number
 *  }
 * }} props
 */
export const PassphraseChecker = ({ pass }) => {
  const { i18n } = useLingui()

  const isCurrentPasswordSafe = isPassphraseSafe(pass)
  const config = getStrengthConfig(isCurrentPasswordSafe.strength)

  if (!config) {
    return null;
  }

  return html` <${PasswordWrapper}>
  <${HighlightString} text=${pass && pass.join('-')} />
  <${NoticeText} text=${i18n._(config.text)} type=${config.type} />
<//>`
}
