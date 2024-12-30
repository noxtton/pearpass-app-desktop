import { html } from 'htm/react'
import {
  CloseIconWrapper,
  Header,
  HeaderChildrenWrapper,
  Wrapper
} from './styles'
import { XIcon } from 'pearpass-lib-ui-react-components'
import { colors } from 'pearpass-lib-ui-theme-provider'

/**
 * @typedef ModalContentProps
 * @property {() => void} onClose
 * @property {any} headerChildren
 * @property {any} children
 */

/**
 * ModalContent component
 * @param {ModalContentProps} props
 */

export const ModalContent = ({ onClose, headerChildren, children }) => {
  return html`
    <${Wrapper}>
      <${Header}>
        <${HeaderChildrenWrapper}> ${headerChildren} <//>

        <${CloseIconWrapper} onClick=${onClose}>
          <${XIcon} size="20" color=${colors.primary400.option2} />
        <//>
      <//>

      ${children}
    <//>
  `
}
