// @ts-check
import { html } from 'htm/react'
import { Overlay } from './styles'

export const ModalOverlay = ({ children }) => {
  return html`
    <${Overlay}>
        ${children}
    </${Overlay}
  `
}
