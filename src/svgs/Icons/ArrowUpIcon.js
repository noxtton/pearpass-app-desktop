import { html } from 'htm/react'
import { colors } from 'pearpass-lib-ui-theme-provider'
/**
 * @typedef ArrowUpIconProps
 * @property {string} [width] width of the svg (optional)
 * @property {string} [height] height of the svg (optional)
 * @property {string} [color] color of the svg (optional)
 */

/**
 * @param {ArrowUpIconProps} props
 */

export const ArrowUpIcon = ({
  color = colors.white.mode1,
  height = '100%',
  width = '100%'
}) => {
  return html`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width=${width}
      height=${height}
      viewBox="0 0 15 15"
      fill="none"
    >
      <path
        d="M13.7642 10.4092L7.61416 4.25918C7.56927 4.21135 7.51505 4.17323 7.45486 4.14717C7.39466 4.12111 7.32976 4.10766 7.26416 4.10766C7.19856 4.10766 7.13366 4.12111 7.07347 4.14717C7.01327 4.17323 6.95905 4.21135 6.91416 4.25918L0.76416 10.4092"
        stroke=${color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  `
}
