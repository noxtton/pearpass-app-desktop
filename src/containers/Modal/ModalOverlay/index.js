import { html } from 'htm/react'
import { Overlay } from './styles'

/**
 * @typedef ModalOverlayProps
 * @property {() => void} onClick
 * @property {'default' | 'blur'} type
 */

/**
 * ModalOverlay component
 * @param {ModalOverlayProps} props
 */

export const ModalOverlay = ({ onClick, type = 'default' }) => {
  return html` <${Overlay} type=${type} onClick=${onClick} /> `
}
