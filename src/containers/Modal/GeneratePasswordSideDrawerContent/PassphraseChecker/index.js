import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { HighlightString, NoticeText } from 'pearpass-lib-ui-react-components'
import { isPassphraseSafe } from 'pearpass-utils-password-check'

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

  const result = isPassphraseSafe(pass)

  return html` <${PasswordWrapper}>
    <${HighlightString} text=${pass && pass.join('-')} />
    ${!result.isSafe
      ? html` <${NoticeText} text=${i18n._('Vulnerable')} type="error" />`
      : html` <${NoticeText} text=${i18n._('Safe')} type="success" />`}
  <//>`
}
