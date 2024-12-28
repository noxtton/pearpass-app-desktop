import { html } from 'htm/react'
import { getIconProps } from './getIconProps'

/**
 * @typedef KeyIconProps
 * @property {string} [size] size of the svg (optional)
 * @property {string} [width] width of the svg (optional)
 * @property {string} [height] height of the svg (optional)
 * @property {string} [color] color of the svg (optional)
 */

/**
 * @param {KeyIconProps} props
 */

export const KeyIcon = (props) => {
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
        d="M5.62 7.88L11.5 2L13.5 4"
        stroke=${color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.25 4.25L11 6"
        stroke=${color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 13C5.15685 13 6.5 11.6569 6.5 10C6.5 8.34315 5.15685 7 3.5 7C1.84315 7 0.5 8.34315 0.5 10C0.5 11.6569 1.84315 13 3.5 13Z"
        stroke=${color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  `
}
