import { html } from 'htm/react'

import { ModalWrapper } from './styles'

/**
 * @typedef ModalProps
 * @property {import('react').ReactNode} children React node to be rendered inside the button
 */

/**
 * Modal component
 * @param {ModalProps} props
 */

export const Modal = ({ children }) => {
  return html` <${ModalWrapper}> ${children} <//> `
}
