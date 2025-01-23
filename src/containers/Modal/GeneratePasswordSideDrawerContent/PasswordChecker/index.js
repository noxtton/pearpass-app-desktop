import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { NoticeText } from 'pearpass-lib-ui-react-components'

import { HighlightString } from '../../../../components/HighlightString'
import { PasswordWrapper } from '../styles'
import { isPasswordSafe } from '../utils'

/**
 * @param {{
 *  pass: string
 * }} props
 */
export const PasswordChecker = ({ pass }) => {
  const { i18n } = useLingui()

  const isCurrentPasswordSafe = isPasswordSafe(pass)

  return html` <${PasswordWrapper}>
    <${HighlightString} text=${pass} />
    ${!isCurrentPasswordSafe
      ? html` <${NoticeText} text=${i18n._('Vulnerable')} type="error" />`
      : html` <${NoticeText} text=${i18n._('Safe')} type="success" />`}
  <//>`
}
