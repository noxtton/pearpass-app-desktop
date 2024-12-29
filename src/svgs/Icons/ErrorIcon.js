import { html } from 'htm/react'
import { getIconProps } from './getIconProps'
/**
 * @typedef ErrorIconProps
 * @property {string} [size] size of the svg (optional)
 * @property {string} [width] width of the svg (optional)
 * @property {string} [height] height of the svg (optional)
 */

/**
 * @param {ErrorIconProps} props
 */

export const ErrorIcon = (props) => {
  const { width, height } = getIconProps(props)

  return html`
    <svg
      width=${width}
      height=${height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_104_1908)">
        <path
          d="M7 13.5C10.5899 13.5 13.5 10.5899 13.5 7C13.5 3.41015 10.5899 0.5 7 0.5C3.41015 0.5 0.5 3.41015 0.5 7C0.5 10.5899 3.41015 13.5 7 13.5Z"
          fill="#D65C5E"
          stroke="#D13B3D"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.93777 3.13574L7.76659 8.42387H6.23709L6.0659 3.13574H7.93777ZM6.99998 10.8651C6.73452 10.8651 6.50627 10.7708 6.31524 10.5823C6.12669 10.3937 6.03241 10.1655 6.03241 9.89755C6.03241 9.63457 6.12669 9.41004 6.31524 9.22397C6.50627 9.03542 6.73452 8.94114 6.99998 8.94114C7.25551 8.94114 7.48004 9.03542 7.67355 9.22397C7.86955 9.41004 7.96754 9.63457 7.96754 9.89755C7.96754 10.0762 7.92165 10.2387 7.82985 10.3851C7.74054 10.5314 7.62269 10.648 7.47632 10.7349C7.33242 10.8217 7.17364 10.8651 6.99998 10.8651Z"
          fill="#F6F6F6"
        />
      </g>
      <defs>
        <clipPath id="clip0_104_1908">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  `
}
