import { html } from 'htm/react'
import { ButtonContainer, IconWrapper } from './styles'
import { colors } from 'pearpass-lib-ui-theme-provider'

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
