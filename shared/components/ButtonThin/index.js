import { html } from 'htm/react'
import { Button } from './styles'

/**
 * @typedef ButtonThinProps
 * @property {import('react').ReactNode} children
 * @property {'black' | 'grey'} [variant] variant of the button can be 'black' or 'grey' (optional)
 * @property {() => void} [leftIcon] left icon of the button (optional)
 * @property {() => void} [rightIcon] right icon of the button (optional)
 * @property {() => void} onClick button click event
 */

/**
 * @param {ButtonThinProps} props
 */

export const ButtonThin = ({
  children,
  leftIcon,
  rightIcon,
  variant = 'black',
  onClick
}) => {
  return html`
    <${Button} variant=${variant} onClick=${onClick}>
      ${leftIcon && html`<${leftIcon} size="14" />`} ${children}
      ${rightIcon && html`<${rightIcon} size="14" />`}
    <//>
  `
}
