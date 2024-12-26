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
 * @param {'default' | 'tight'} sidebarSize
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
  sidebarSize = 'default',
  selected = false,
  categoryName,
  quantity = 0,
  color,
  icon,
  onClick
}) => {
  return html` 
  <${CategoryButton} sidebarSize=${sidebarSize} color=${color} selected=${selected} onClick=${onClick} >
    <${CategoryDescription} sidebarSize=${sidebarSize}>
    <${CategoryIconWrapper} selected=${selected} color=${color}>
      <${icon} />
    </${CategoryIconWrapper}>
      <${categoryTitle} >
        ${categoryName}
      </${categoryTitle} >
    </${CategoryDescription}>
    <${CategoryQuantity}>
      ${quantity}
    </${CategoryQuantity}>
  </${CategoryButton}> `
}
