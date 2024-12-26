import { html } from 'htm/react'
/**
 * @typedef CreditCardIconProps
 * @property {string} [width] width of the svg (optional)
 * @property {string} [height] height of the svg (optional)
 * @property {string} [fill] color of the svg (optional)
 */

/**
 * @param {CreditCardIconProps} props
 */

export const CreditCardIcon = ({
  fill = 'none',
  height = '100%',
  width = '100%'
}) => {
  return html`
    <svg
      width=${width}
      height=${height}
      viewBox="0 0 14 15"
      fill=${fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 2.69336H1.5C0.947715 2.69336 0.5 3.14107 0.5 3.69336V11.1934C0.5 11.7456 0.947715 12.1934 1.5 12.1934H12.5C13.0523 12.1934 13.5 11.7456 13.5 11.1934V3.69336C13.5 3.14107 13.0523 2.69336 12.5 2.69336Z"
        stroke="#F6F6F6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M0.5 6.19336H13.5"
        stroke="#F6F6F6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.5 9.69336H11"
        stroke="#F6F6F6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `
}
