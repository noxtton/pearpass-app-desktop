import { html } from 'htm/react'

import { Wrapper } from './styles'
import { ModalHeader } from '../ModalHeader'

/**
 * @param {{
 *  onClose: () => void
 *  headerChildren: import('react').ReactNode
 *  children: import('react').ReactNode
 *  onSubmit?: () => void
 * }} props
 */
export const ModalContent = ({
  onClose,
  onSubmit,
  headerChildren,
  children
}) => html`
    <${Wrapper}>
      <${ModalHeader} onClose=${onClose} onSubmit=${onSubmit}>
        ${headerChildren}
      </${ModalHeader}>
      ${children}
    </${Wrapper}>
  `
