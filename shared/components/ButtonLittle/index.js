import { html } from 'htm/react'
import { Button } from './styles'

/**
 * @typedef ButtonLittleProps
 * @property {import('react').ReactNode} children
 * @property {'primary' | 'secondary'} [variant] variant of the button can be 'primary' or 'secondary' (optional)
 * @property {() => void} [leftIcon] left icon of the button (optional)
 * @property {() => void} onClick button click event
 */

/**
 * @param {ButtonLittleProps} props
 */

export const ButtonLittle = ({
  children,
  leftIcon,
  variant = 'primary',
  onClick
}) => {
  return html`
    <${Button} variant=${variant} onClick=${onClick}>
      ${leftIcon && html`<${leftIcon} size="14px" />`} ${children}
    <//>
  `
}
