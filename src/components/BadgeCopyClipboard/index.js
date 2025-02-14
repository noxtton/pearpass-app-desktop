import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { CopyIcon } from 'pearpass-lib-ui-react-components'
import { colors } from 'pearpass-lib-ui-theme-provider'

import { Badge } from './styles'

/**
 * @param {{
 *  isCopied: boolean
 * }} props
 */
export const BadgeCopyClipboard = ({ isCopied }) => {
  const { i18n } = useLingui()
  return isCopied
    ? html` <${Badge}>
        <${CopyIcon} color=${colors.black.mode1} />
        ${i18n._('Copied to clipboard')}
      <//>`
    : null
}
