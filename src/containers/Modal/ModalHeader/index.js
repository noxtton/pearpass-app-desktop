import { html } from 'htm/react'
import { ButtonRoundIcon, XIcon } from 'pearpass-lib-ui-react-components'

import { Header, HeaderChildrenWrapper } from './styles'

/**
 * @param {{
 *  onClose: () => void
 *  children: import('react').ReactNode
 * }} props
 */
export const ModalHeader = ({ onClose, children }) => html`
  <${Header}>
    <${HeaderChildrenWrapper}> ${children} <//>

    <${ButtonRoundIcon} onClick=${onClose} startIcon=${XIcon} />
  <//>
`
