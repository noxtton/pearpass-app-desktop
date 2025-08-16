import { html } from 'htm/react'
import { ArrowDownIcon, ArrowUpIcon } from 'pearpass-lib-ui-react-components'

import { Label } from './styles'

/**
 * @param {{
 *    selectedItem?: { name: string },
 *    isOpen: boolean,
 *    setIsOpen?: (isOpen: boolean) => void,
 *    placeholder: string
 *  }} props
 */
export const SelectLabel = ({
  selectedItem,
  isOpen,
  setIsOpen,
  placeholder
}) => html`
  <${Label} onClick=${() => setIsOpen?.(!isOpen)}>
    <span> ${selectedItem?.name || placeholder} </span>
    <${isOpen ? ArrowUpIcon : ArrowDownIcon} size="14" />
  <//>
`
