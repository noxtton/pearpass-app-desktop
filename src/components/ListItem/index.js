import { html } from 'htm/react'
import {
  BrushIcon,
  CheckIcon,
  DeleteIcon,
  LockCircleIcon,
  ShareIcon
} from 'pearpass-lib-ui-react-components'
import { colors } from 'pearpass-lib-ui-theme-provider'

import {
  SelectedListItemIconContainer,
  ListItemActions,
  ListItemContainer,
  ListItemDate,
  ListItemDescription,
  ListItemInfo,
  ListItemName
} from './styles'

export const ListItem = ({
  item,
  itemName,
  itemDateText,
  onClick,
  onShareClick,
  onEditClick,
  onDeleteClick,
  isSelected
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(item)
    }
  }

  return html`
    <${ListItemContainer} isSelected=${isSelected} onClick=${handleClick}>
      <${ListItemInfo}>
        ${isSelected
          ? html` <${SelectedListItemIconContainer}>
              <${CheckIcon} size="21" color=${colors.black.mode1} />
            <//>`
          : html`<${LockCircleIcon} size="21" />`}

        <${ListItemDescription}>
          <${ListItemName}>${itemName}<//>
          <${ListItemDate}> ${itemDateText} <//>
        <//>
      <//>

      <${ListItemActions}>
        ${onShareClick &&
        html`
          <span onClick=${onShareClick}>
            <${ShareIcon} />
          </span>
        `}
        ${onEditClick &&
        html`<span onClick=${onEditClick}> <${BrushIcon} /></span>`}
        ${onDeleteClick &&
        html`<span onClick=${onShareClick}><${DeleteIcon} /></span>`}
      <//>
    <//>
  `
}
