import { html } from 'htm/react'
import { colors } from 'pearpass-lib-ui-theme-provider'
/**
 * @typedef UserSecurityIconProps
 * @property {string} [width] width of the svg (optional)
 * @property {string} [height] height of the svg (optional)
 * @property {string} [color] color of the svg (optional)
 */

/**
 * @param {UserSecurityIconProps} props
 */

export const UserSecurityIcon = ({
  height = '100%',
  width = '100%',
  color = colors.white.mode1
}) => {
  return html`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width=${width}
      height=${height}
      viewBox="0 0 14 15"
      fill="none"
    >
      <path
        d="M13.5 11V13C13.5 13.2652 13.3946 13.5196 13.2071 13.7071C13.0196 13.8946 12.7652 14 12.5 14H10.5"
        stroke=${color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 1H12.5C12.7652 1 13.0196 1.10536 13.2071 1.29289C13.3946 1.48043 13.5 1.73478 13.5 2V4"
        stroke=${color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.5 4V2C0.5 1.73478 0.605357 1.48043 0.792893 1.29289C0.98043 1.10536 1.23478 1 1.5 1H3.5"
        stroke=${color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 14H1.5C1.23478 14 0.98043 13.8946 0.792893 13.7071C0.605357 13.5196 0.5 13.2652 0.5 13V11"
        stroke=${color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 7C8.10457 7 9 6.10457 9 5C9 3.89543 8.10457 3 7 3C5.89543 3 5 3.89543 5 5C5 6.10457 5.89543 7 7 7Z"
        stroke=${color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.16 11.0001C9.87565 10.4029 9.42789 9.89855 8.86861 9.54543C8.30934 9.1923 7.66145 9.00488 7.00003 9.00488C6.3386 9.00488 5.69071 9.1923 5.13144 9.54543C4.57217 9.89855 4.1244 10.4029 3.84003 11.0001"
        stroke=${color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  `
}
