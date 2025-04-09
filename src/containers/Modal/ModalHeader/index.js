import { html } from 'htm/react'
import { XIcon } from 'pearpass-lib-ui-react-components'
import { colors } from 'pearpass-lib-ui-theme-provider'

import { CloseIconWrapper, Header, HeaderChildrenWrapper } from './styles'

/**
 * @param {{
 *  onClose: () => void
 *  children: import('react').ReactNode
 * }} props
 */
export const ModalHeader = ({ onClose, children }) => html`
  <${Header}>
    <${HeaderChildrenWrapper}> ${children} <//>

    <${CloseIconWrapper} onClick=${onClose}>
      <${XIcon} size="20" color=${colors.primary400.option2} />
    <//>
  <//>
`
