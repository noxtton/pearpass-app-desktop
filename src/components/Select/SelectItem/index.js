import { html } from 'htm/react'

import { SelectItemWrapper } from './styles'

/**
 * @param {{
 *    onClick: () => void,
 *    item: { name: string }
 *  }} props
 */
export const SelectItem = ({ item, onClick }) => html`
  <${SelectItemWrapper} onClick=${() => onClick?.()}> ${item.name} <//>
`
