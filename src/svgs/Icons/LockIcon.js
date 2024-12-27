import { html } from 'htm/react'
import { colors } from 'pearpass-lib-ui-theme-provider'
/**
 * @typedef LockIconProps
 * @property {string} [width] width of the svg (optional)
 * @property {string} [height] height of the svg (optional)
 * @property {string} [color] color of the svg (optional)
 */

/**
 * @param {LockIconProps} props
 */

export const LockIcon = ({
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
      <g clipPath="url(#clip0_18_240)">
        <path
          d="M11 6H3C2.44772 6 2 6.44772 2 7V13C2 13.5523 2.44772 14 3 14H11C11.5523 14 12 13.5523 12 13V7C12 6.44772 11.5523 6 11 6Z"
          stroke=${color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 6V4.5C10.5 3.57174 10.1313 2.6815 9.47487 2.02513C8.8185 1.36875 7.92826 1 7 1C6.07174 1 5.1815 1.36875 4.52513 2.02513C3.86875 2.6815 3.5 3.57174 3.5 4.5V6"
          stroke=${color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 10.5C7.27614 10.5 7.5 10.2761 7.5 10C7.5 9.72386 7.27614 9.5 7 9.5C6.72386 9.5 6.5 9.72386 6.5 10C6.5 10.2761 6.72386 10.5 7 10.5Z"
          stroke=${color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_18_240">
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
