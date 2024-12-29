import { html } from 'htm/react'
import { Button } from './styles'

/**
 * @typedef ButtonSingleInputProps
 * @property {import('react').ReactNode} children
 * @property {() => void} [leftIcon] left icon of the button (optional)
 * @property {() => void} onClick button click event
 */

/**
 * @param {ButtonSingleInputProps} props
 */

export const ButtonSingleInput = ({ children, leftIcon, onClick }) => {
  return html`
    <${Button} onClick=${onClick}>
      ${leftIcon && html`<${leftIcon} size="20" />`} ${children}
    <//>
  `
}
