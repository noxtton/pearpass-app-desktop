import { html } from 'htm/react'
import { Button } from './styles'

/**
 * @typedef ButtonThinProps
 * @property {string} [text] text of the button (optional)
 * @property {'black' | 'grey'} [variant] variant of the button can be 'black' or 'grey' (optional)
 * @property {() => void} [leftIcon] left icon of the button (optional)
 * @property {() => void} [rightIcon] right icon of the button (optional)
 */

/**
 * @param {ButtonThinProps} props
 */

export const ButtonThin = ({ text, leftIcon, rightIcon, variant }) => {
  return html`
    <${Button} variant=${variant}>
      ${leftIcon && html`<${leftIcon} width=${'14px'} />`} ${text}
      ${rightIcon && html`<${rightIcon} width=${'14px'} />`}
    <//>
  `
}
