import { html } from 'htm/react'
import { getIconProps } from './getIconProps'
/**
 * @typedef YellowErrorIconProps
 * @property {string} [size] size of the svg (optional)
 * @property {string} [width] width of the svg (optional)
 * @property {string} [height] height of the svg (optional)
 */

/**
 * @param {YellowErrorIconProps} props
 */

export const YellowErrorIcon = (props) => {
  const { width, height } = getIconProps(props)

  return html`
    <svg
      width=${width}
      height=${height}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_107_2627)">
        <path
          d="M7.92213 1.5499C7.83821 1.3861 7.71072 1.24863 7.55369 1.15264C7.39665 1.05665 7.21618 1.00586 7.03213 1.00586C6.84808 1.00586 6.66761 1.05665 6.51058 1.15264C6.35354 1.24863 6.22605 1.3861 6.14213 1.5499L0.64213 12.5499C0.56542 12.7021 0.528898 12.8714 0.536033 13.0418C0.543167 13.2121 0.593721 13.3777 0.682893 13.523C0.772066 13.6683 0.896896 13.7884 1.04553 13.8718C1.19416 13.9553 1.36167 13.9994 1.53213 13.9999H12.5321C12.7026 13.9994 12.8701 13.9553 13.0187 13.8718C13.1674 13.7884 13.2922 13.6683 13.3814 13.523C13.4705 13.3777 13.5211 13.2121 13.5282 13.0418C13.5354 12.8714 13.4988 12.7021 13.4221 12.5499L7.92213 1.5499Z"
          fill="#FFAE00"
          stroke="#FFAE00"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.96982 4.55664L7.79863 9.84477H6.26913L6.09795 4.55664H7.96982ZM7.03202 12.286C6.76656 12.286 6.53831 12.1917 6.34728 12.0032C6.15873 11.8146 6.06445 11.5864 6.06445 11.3184C6.06445 11.0555 6.15873 10.8309 6.34728 10.6449C6.53831 10.4563 6.76656 10.362 7.03202 10.362C7.28756 10.362 7.51208 10.4563 7.7056 10.6449C7.90159 10.8309 7.99959 11.0555 7.99959 11.3184C7.99959 11.4971 7.95369 11.6596 7.86189 11.8059C7.77258 11.9523 7.65474 12.0689 7.50836 12.1558C7.36447 12.2426 7.20569 12.286 7.03202 12.286Z"
          fill="#F6F6F6"
        />
      </g>
      <defs>
        <clipPath id="clip0_107_2627">
          <rect
            width="14"
            height="14"
            fill="white"
            transform="translate(0.0322266 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  `
}
