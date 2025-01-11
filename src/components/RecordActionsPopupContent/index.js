import { html } from 'htm/react'

import { MenuCard, MenuItem } from './styles'
import { RECORD_ACTION_ICON_BY_TYPE } from '../../constants/recordActions'

/**
 * @param {{
 *  menuItems: Array<string>,
 *  variant: 'default' | 'compact',
 *  onClick: () => void,
 * }}
 */
export const RecordActionsPopupContent = ({
  variant = 'default',
  menuItems,
  onClick
}) => {
  const handleMenuItemClick = (e) => {
    e.stopPropagation()

    onClick()
  }

  return html`
    <${MenuCard} variant=${variant}>
      ${menuItems.map(
        (item) => html`
          <${MenuItem}
            key=${item.type}
            variant=${variant}
            onClick=${handleMenuItemClick}
          >
            <${RECORD_ACTION_ICON_BY_TYPE[item.type]} size="14" />

            <p>${item.name}</p>
          <//>
        `
      )}
    <//>
  `
}
