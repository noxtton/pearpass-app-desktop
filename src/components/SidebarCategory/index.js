import { html } from 'htm/react'
import {
  CategoryButton,
  CategoryDescription,
  CategoryIconWrapper,
  CategoryQuantity,
  categoryTitle
} from './styles'

/**
 * @typedef SidebarCategoryProps
 * @param {'default' | 'tight'} size
 * @param {boolean} selected
 * @param {string} categoryName
 * @param {number} quantity
 * @param {string} color
 * @param {string} icon
 * @param {() => void} onClick
 */

/**
 *
 * @param {SidebarCategoryProps} props
 * @returns
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

        <${categoryTitle}>${categoryName}<//>
      <//>

      <${CategoryQuantity}>${quantity}<//>
    <//>
  `
}
