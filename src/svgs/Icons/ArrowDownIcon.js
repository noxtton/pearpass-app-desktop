import { html } from 'htm/react'
/**
 * @typedef ArrowDownIconProps
 * @property {string} [width] width of the svg (optional)
 * @property {string} [height] height of the svg (optional)
 * @property {string} [fill] color of the svg (optional)
 */

/**
 * @param {ArrowDownIconProps} props
 */

export const ArrowDownIcon = ({
  fill = 'none',
  height = '100%',
  width = '100%'
}) => {
  return html`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width=${width}
      height=${height}
      viewBox="0 0 15 15"
      fill=${fill}
    >
      <path
        d="M0.76416 4.10742L6.91416 10.2574C6.95905 10.3053 7.01327 10.3434 7.07347 10.3694C7.13366 10.3955 7.19856 10.4089 7.26416 10.4089C7.32976 10.4089 7.39466 10.3955 7.45485 10.3694C7.51505 10.3434 7.56927 10.3053 7.61416 10.2574L13.7642 4.10742"
        stroke="#F6F6F6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `
}
