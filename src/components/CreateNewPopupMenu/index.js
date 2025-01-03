import { html } from 'htm/react'

import { MenuItem, MenuWrapper, PopupMenuContainer } from './styles'

/**
 * @param {{
 *  menuItems: Array<{
 *   icon: any,
 *   name: string,
 *   color: string
 *  }>,
 *  anchor: 'left' | 'center' | 'right',
 *  position: 'left' | 'center' | 'right',
 *  gap: number
 * }} props
 */

export const CreateNewPopupMenu = ({ menuItems, anchor, gap, position }) => {
  return html`
    <${PopupMenuContainer} anchor=${anchor} , gap=${gap}>
      <${MenuWrapper} position=${position}>
        ${menuItems.map(
          (item) =>
            html`<${MenuItem} color=${item.color} key=${item.name}>
              <${item.icon} size="14" color=${item.color} />
              ${item.name}
            <//>`
        )}
      <//>
    <//>
  `
}
