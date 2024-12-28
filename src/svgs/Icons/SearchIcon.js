import { html } from 'htm/react'
import { getIconProps } from './getIconProps'
/**
 * @typedef SearchIconProps
 * @property {string} [size] size of the svg (optional)
 * @property {string} [width] width of the svg (optional)
 * @property {string} [height] height of the svg (optional)
 * @property {string} [color] color of the svg (optional)
 */

/**
 * @param {SearchIconProps} props
 */

export const SearchIcon = (props) => {
  const { width, height, color } = getIconProps(props)

  return html`
    <svg
      width=${width}
      height=${height}
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.92 11.84C8.91338 11.84 11.34 9.41338 11.34 6.42C11.34 3.42662 8.91338 1 5.92 1C2.92662 1 0.5 3.42662 0.5 6.42C0.5 9.41338 2.92662 11.84 5.92 11.84Z"
        stroke=${color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 14L9.75 10.25"
        stroke=${color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  `
}
