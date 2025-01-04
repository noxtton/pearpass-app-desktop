import { html } from 'htm/react'

import {
  CategoryButton,
  CategoryDescription,
  CategoryIconWrapper,
  CategoryQuantity
} from './styles'

/**
 * @param {{
 *  size: 'default' | 'tight',
 *  selected: boolean,
 *  categoryName: string,
 *  quantity: number,
 *  color: string,
 *  icon: import('react').ReactNode,
 *  onClick: () => void
 * }} props
 */
export const SidebarCategory = ({
  size = 'default',
  selected = false,
  categoryName,
  quantity = 0,
  color,
  icon,
  onClick
}) => {
  return html`
    <${CategoryButton}
      size=${size}
      color=${color}
      selected=${selected}
      onClick=${onClick}
    >
      <${CategoryDescription} size=${size}>
        <${CategoryIconWrapper} selected=${selected} color=${color}>
          <${icon} />
        <//>

        <span>${categoryName}</span>
      <//>

      <${CategoryQuantity}>${quantity}<//>
    <//>
  `
}
