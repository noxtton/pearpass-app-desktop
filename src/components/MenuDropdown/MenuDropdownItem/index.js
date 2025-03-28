import { html } from 'htm/react'
import { FolderIcon } from 'pearpass-lib-ui-react-components'

import { DropDownItem, FolderIconWrapper } from '../styles'

/**
 * @param {{
 *    onClick: () => void,
 *    item: {name: string, icon?: import('react').ReactNode}
 *  }} props
 */
export const MenuDropdownItem = ({ item, onClick }) => {
  return html`
    <${DropDownItem} onClick=${() => onClick?.()}>
      <${FolderIconWrapper}>
        <${item.icon ?? FolderIcon}
          size="14"
          color=${item.color ?? undefined}
        />
      <//>

      ${item.name}
    <//>
  `
}
