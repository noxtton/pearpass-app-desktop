import { html } from 'htm/react'
import { colors } from 'pearpass-lib-ui-theme-provider'

import { Button } from './styles'

/**
 * @param {{
 *  children: import('react').ReactNode
 *  startIcon: import('react').ElementType
 *  onClick: () => void
 * }} props
 */
export const ButtonRoundIcon = ({ children, startIcon, onClick }) => {
  return html`
    <${Button} type="button" onClick=${onClick}>
      ${startIcon &&
      html`<${startIcon} color=${colors.primary400.mode1} size="24" />`}
      ${children}
    <//>
  `
}
