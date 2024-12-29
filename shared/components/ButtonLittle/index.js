import { html } from 'htm/react'
import { Button } from './styles'

/**
 * @typedef ButtonLittleProps
 * @property {import('react').ReactNode} children
 * @property {'primary' | 'secondary'} [variant] variant of the button can be 'primary' or 'secondary' (optional)
 * @property {() => void} [leftIcon] left icon of the button (optional)
 */

/**
 * @param {ButtonLittleProps} props
 */

export const ButtonLittle = ({ children, leftIcon, variant = 'primary' }) => {
  return html`
    <${Button} variant=${variant}>
      ${leftIcon && html`<${leftIcon} size="14px" />`} ${children}
    <//>
  `
}
