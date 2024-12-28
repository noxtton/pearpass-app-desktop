import { html } from 'htm/react'
import { getIconProps } from './getIconProps'
/**
 * @typedef PlusIconProps
 * @property {string} [size] size of the svg (optional)
 * @property {string} [width] width of the svg (optional)
 * @property {string} [height] height of the svg (optional)
 * @property {string} [color] color of the svg (optional)
 */

/**
 * @param {PlusIconProps} props
 */

export const PlusIcon = (props) => {
  const { width, height, color } = getIconProps(props)

  return html`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width=${width}
      height=${height}
      viewBox="0 0 14 15"
      fill="none"
    >
      <path
        d="M7 1.04004V14.04"
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
    </svg>
  `
}
