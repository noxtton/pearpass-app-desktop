import { html } from 'htm/react'
import { colors } from 'pearpass-lib-ui-theme-provider'
/**
 * @typedef UserIconProps
 * @property {string} [width] width of the svg (optional)
 * @property {string} [height] height of the svg (optional)
 * @property {string} [color] color of the svg (optional)
 */

/**
 * @param {UserIconProps} props
 */

export const UserIcon = ({
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
      <g clipPath="url(#clip0_18_231)">
        <path
          d="M7 7.5C8.79493 7.5 10.25 6.04493 10.25 4.25C10.25 2.45507 8.79493 1 7 1C5.20507 1 3.75 2.45507 3.75 4.25C3.75 6.04493 5.20507 7.5 7 7.5Z"
          stroke=${color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.18 14.0003C12.7602 12.6912 11.9355 11.5492 10.8248 10.739C9.7141 9.92877 8.37481 9.49219 7.00001 9.49219C5.6252 9.49219 4.28591 9.92877 3.17522 10.739C2.06453 11.5492 1.23983 12.6912 0.820007 14.0003H13.18Z"
          stroke=${color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_18_231">
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
