import { html } from 'htm/react'
import { Overlay } from './styles'

/**
 * @typedef ModalOverlayProps
 * @property {import('react').ReactNode} children React node to be rendered inside the button
 */

/**
 * ButtonPrimary component
 * @param {ModalOverlayProps} props
 */

export const ModalOverlay = ({ children }) => {
  return html`
    <${Overlay}>
        ${children}
    </${Overlay}
  `
}
