import { html } from 'htm/react'
import { colors } from 'pearpass-lib-ui-theme-provider'

import { ButtonContainer, IconWrapper } from './styles'

/**
 * @param {{
 *    icon: any,
 *    text: string,
 * }} props
 */

export const ButtonCreate = ({ icon, text }) => {
  return html`
    <${ButtonContainer}>
      <${IconWrapper}> <${icon} color=${colors.black.mode1} /> <//> ${text}
    <//>
  `
}
