import { html } from 'htm/react'
import { getIconProps } from './getIconProps'

/**
 * @typedef WorldIconProps
 * @property {string} [size] size of the svg (optional)
 * @property {string} [width] width of the svg (optional)
 * @property {string} [height] height of the svg (optional)
 * @property {string} [color] color of the svg (optional)
 */

/**
 * @param {WorldIconProps} props
 */

export const WorldIcon = (props) => {
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
        d="M7 14C10.5899 14 13.5 11.0899 13.5 7.5C13.5 3.91015 10.5899 1 7 1C3.41015 1 0.5 3.91015 0.5 7.5C0.5 11.0899 3.41015 14 7 14Z"
        stroke=${color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.5 7.5H13.5"
        stroke=${color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 7.5C9.3772 9.87699 8.50168 12.1533 7 14C5.49832 12.1533 4.6228 9.87699 4.5 7.5C4.6228 5.12301 5.49832 2.84665 7 1C8.50168 2.84665 9.3772 5.12301 9.5 7.5V7.5Z"
        stroke=${color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  `
}
