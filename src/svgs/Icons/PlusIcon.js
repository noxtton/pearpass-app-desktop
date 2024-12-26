import { html } from 'htm/react'
/**
 * @typedef PlusIconProps
 * @property {string} [width] width of the svg (optional)
 * @property {string} [height] height of the svg (optional)
 * @property {string} [fill] color of the svg (optional)
 */

/**
 * @param {PlusIconProps} props
 */

export const PlusIcon = ({
  fill = 'none',
  height = '100%',
  width = '100%'
}) => {
  return html`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width=${width}
      height=${height}
      viewBox="0 0 14 15"
      fill=${fill}
    >
      <path
        d="M7 1.04004V14.04"
        stroke="#F6F6F6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M0.5 7.5H13.5"
        stroke="#F6F6F6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `
}
