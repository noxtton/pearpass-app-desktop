import { html } from 'htm/react'
import { Button } from './styles'

/**
 * @typedef {'sm' | 'md' | 'lg'} ButtonSize
 */

/**
 * @typedef ButtonSecondaryProps
 * @property {import('react').ReactNode} children React node to be rendered inside the button
 * @property {ButtonSize} [size='md'] Enum type for button size, default is 'md'
 */

/**
 * @param {ButtonSecondaryProps} props
 */

export const ButtonSecondary = ({ children, size = 'md' }) => {
  return html`
    <${Button} size=${size}>
        ${children}
    </${Button}>
  `
}
