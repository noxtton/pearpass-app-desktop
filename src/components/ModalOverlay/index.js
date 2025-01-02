import { html } from 'htm/react'

import { Overlay } from './styles'
import { useModal } from '../../context/ModalContext'

/**
 * @typedef ModalOverlayProps
 * @property {import('react').ReactNode} children React node to be rendered inside the button
 * @property {number} opacity Opacity value between 0 and 1
 * @property {string} opacity blur value
 */

/**
 * ButtonPrimary component
 * @param {ModalOverlayProps} props
 */

export const ModalOverlay = ({ children, opacity = 0.5, blur = '0' }) => {
  const { isOpen, closeModal } = useModal()

  if (!isOpen) return

  return html`
    <${Overlay} opacity=${opacity} blur=${blur} onClick=${closeModal}>
      <div onClick=${(event) => event.stopPropagation()}>${children}</div>
    <//>
  `
}
