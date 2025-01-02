import { html } from 'htm/react'

import { MenuItem, MenuWrapper } from './styles'

/**
 * @typedef CreateNewPopupMenuProps
 * @property {
 *  {
 *    icon: any,
 *    name: string,
 *    color: string
 * }[]
 * } [menuItems]
 */

/**
 * @param {CreateNewPopupMenuProps} props
 */

export const CreateNewPopupMenu = ({ menuItems }) => {
  return html`
    <${MenuWrapper}>
      ${menuItems.map(
        (item) =>
          html`<${MenuItem} color=${item.color} key=${item.name}>
            <${item.icon} width=${'14px'} color=${item.color} />
            ${item.name}
          <//>`
      )}
    <//>
  `
}
