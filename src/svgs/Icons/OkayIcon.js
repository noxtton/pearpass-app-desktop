import { html } from 'htm/react'
import { getIconProps } from './getIconProps'
/**
 * @typedef OkayIconProps
 * @property {string} [size] size of the svg (optional)
 * @property {string} [width] width of the svg (optional)
 * @property {string} [height] height of the svg (optional)
 */

/**
 * @param {OkayIconProps} props
 */

export const OkayIcon = (props) => {
  const { width, height } = getIconProps(props)

  return html`
    <svg
      width=${width}
      height=${height}
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_104_2594)">
        <path
          d="M7.40002 13.5C10.9899 13.5 13.9 10.5899 13.9 7C13.9 3.41015 10.9899 0.5 7.40002 0.5C3.81017 0.5 0.900024 3.41015 0.900024 7C0.900024 10.5899 3.81017 13.5 7.40002 13.5Z"
          fill="#BADE5B"
        />
        <path
          d="M4.40002 8L6.45002 9.64C6.50508 9.68534 6.56955 9.71784 6.63874 9.73514C6.70793 9.75244 6.78011 9.7541 6.85002 9.74C6.92061 9.72676 6.98751 9.69847 7.04618 9.65706C7.10485 9.61564 7.15391 9.56207 7.19002 9.5L10.4 4"
          fill="#BADE5B"
        />
        <path
          d="M4.40002 8L6.45002 9.64C6.50508 9.68534 6.56955 9.71784 6.63874 9.73514C6.70793 9.75244 6.78011 9.7541 6.85002 9.74C6.92061 9.72676 6.98751 9.69847 7.04618 9.65706C7.10485 9.61564 7.15391 9.56207 7.19002 9.5L10.4 4"
          stroke="#050B06"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_104_2594">
          <rect
            width="14"
            height="14"
            fill="white"
            transform="translate(0.400024)"
          />
        </clipPath>
      </defs>
    </svg>
  `
}
