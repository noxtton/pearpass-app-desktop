import { html } from 'htm/react'
import { colors } from 'pearpass-lib-ui-theme-provider'
/**
 * @typedef FullBodyIconProps
 * @property {string} [width] width of the svg (optional)
 * @property {string} [height] height of the svg (optional)
 * @property {string} [color] color of the svg (optional)
 */

/**
 * @param {FullBodyIconProps} props
 */

export const FullBodyIcon = ({
  color = colors.white.mode1,
  height = '100%',
  width = '100%'
}) => {
  return html`
    <svg
      width=${width}
      height=${height}
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_18_229)">
        <path
          d="M7 5C8.10457 5 9 4.10457 9 3C9 1.89543 8.10457 1 7 1C5.89543 1 5 1.89543 5 3C5 4.10457 5.89543 5 7 5Z"
          stroke=${color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 8.5C10.5 7.57174 10.1313 6.6815 9.47487 6.02513C8.8185 5.36875 7.92826 5 7 5C6.07174 5 5.1815 5.36875 4.52513 6.02513C3.86875 6.6815 3.5 7.57174 3.5 8.5V10H5L5.5 14H8.5L9 10H10.5V8.5Z"
          stroke=${color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_18_229">
          <rect
            width="14"
            height="14"
            fill=${color}
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  `
}
