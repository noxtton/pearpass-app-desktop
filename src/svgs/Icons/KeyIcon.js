import { html } from 'htm/react'
/**
 * @typedef KeyIconProps
 * @property {string} [width] width of the svg (optional)
 * @property {string} [height] height of the svg (optional)
 * @property {string} [fill] color of the svg (optional)
 */

/**
 * @param {KeyIconProps} props
 */

export const KeyIcon = ({ fill = 'none', height = '100%', width = '100%' }) => {
  return html`
    <svg
      width=${width}
      height=${height}
      viewBox="0 0 14 15"
      fill=${fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.62 7.88L11.5 2L13.5 4"
        stroke="#F6F6F6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.25 4.25L11 6"
        stroke="#F6F6F6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.5 13C5.15685 13 6.5 11.6569 6.5 10C6.5 8.34315 5.15685 7 3.5 7C1.84315 7 0.5 8.34315 0.5 10C0.5 11.6569 1.84315 13 3.5 13Z"
        stroke="#F6F6F6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `
}
