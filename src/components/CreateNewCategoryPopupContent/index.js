import { html } from 'htm/react'

import { MenuItem, MenuList } from './styles'
import { RECORD_COLOR_BY_TYPE } from '../../constants/recordColorByTYpe'
import { RECORD_ICON_BY_TYPE } from '../../constants/recordIconByType'

/**
 * @param {{
 * menuItems: Array<string>,
 * onClick: () => void,
 * }}
 */
export const CreateNewCategoryPopupContent = ({ menuItems, onClick }) => {
  const handleMenuItemClick = (e, item) => {
    e.stopPropagation()

    onClick(item)
  }

  return html`
    <${MenuList}>
      ${menuItems.map(
        (item) =>
          html`<${MenuItem}
            color=${RECORD_COLOR_BY_TYPE[item.type]}
            key=${item.type}
            onClick=${(e) => handleMenuItemClick(e, item)}
          >
            <${RECORD_ICON_BY_TYPE[item.type]}
              size="14"
              color=${RECORD_COLOR_BY_TYPE[item.type]}
            />

            ${item.name}
          <//>`
      )}
    <//>
  `
}
