import { html } from 'htm/react'

import { Wrapper } from './styles'
import { ModalHeader } from '../ModalHeader'

/**
 * @param {{
 *  onClose: () => void
 *  headerChildren: import('react').ReactNode
 *  children: import('react').ReactNode
 * }} props
 */
export const ModalContent = ({ onClose, headerChildren, children }) => {
  return html`
    <${Wrapper}>
      <${ModalHeader} onClick=${onClose}> ${headerChildren} <//>

      <div>${children}</div>
    <//>
  `
}
