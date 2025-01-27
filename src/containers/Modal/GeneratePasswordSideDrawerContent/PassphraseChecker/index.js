import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { HighlightString, NoticeText } from 'pearpass-lib-ui-react-components'

import { PasswordWrapper } from '../styles'
import { isPassphraseSafe } from '../utils'

/**
 * @param {{
 *  pass: string
 * }} props
 */
export const PassphraseChecker = ({ pass }) => {
  const { i18n } = useLingui()

  const isCurrentPassphraseSafe = isPassphraseSafe(pass)

  return html` <${PasswordWrapper}>
    <${HighlightString} text=${pass && pass.join('-')} />
    ${!isCurrentPassphraseSafe
      ? html` <${NoticeText} text=${i18n._('Vulnerable')} type="error" />`
      : html` <${NoticeText} text=${i18n._('Safe')} type="success" />`}
  <//>`
}
