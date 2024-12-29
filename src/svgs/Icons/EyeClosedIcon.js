import { html } from 'htm/react'
import { getIconProps } from './getIconProps'

/**
 * @typedef EyeClosedIconProps
 * @property {string} [size] size of the svg (optional)
 * @property {string} [width] width of the svg (optional)
 * @property {string} [height] height of the svg (optional)
 * @property {string} [color] color of the svg (optional)
 */

/**
 * @param {EyeClosedIconProps} props
 */

export const EyeClosedIcon = (props) => {
  const { width, height, color } = getIconProps(props)

  return html`
    <svg
      width=${width}
      height=${height}
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_177_2261)">
        <path
          d="M12.4001 7.50039C12.4001 7.50039 10.0001 11.1004 7.0001 11.1004C4.0001 11.1004 1.6001 7.50039 1.6001 7.50039C1.6001 7.50039 4.0001 3.90039 7.0001 3.90039C10.0001 3.90039 12.4001 7.50039 12.4001 7.50039Z"
          stroke=${color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.00002 8.10039C7.3314 8.10039 7.60002 7.83176 7.60002 7.50039C7.60002 7.16902 7.3314 6.90039 7.00002 6.90039C6.66865 6.90039 6.40002 7.16902 6.40002 7.50039C6.40002 7.83176 6.66865 8.10039 7.00002 8.10039Z"
          stroke=${color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0.591675 1.0918L13.4106 13.9107"
          stroke=${color}
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_177_2261">
          <rect
            width="14"
            height="14"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  `
}
