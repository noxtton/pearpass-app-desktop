import { html } from 'htm/react'
/**
 * @typedef CommonFileIconProps
 * @property {string} [width] width of the svg (optional)
 * @property {string} [height] height of the svg (optional)
 * @property {string} [fill] color of the svg (optional)
 */

/**
 * @param {CommonFileIconProps} props
 */

export const CommonFileIcon = ({
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
      <g clip-path="url(#clip0_18_230)">
        <path
          d="M12.5 13C12.5 13.2652 12.3946 13.5196 12.2071 13.7071C12.0196 13.8946 11.7652 14 11.5 14H2.5C2.23478 14 1.98043 13.8946 1.79289 13.7071C1.60536 13.5196 1.5 13.2652 1.5 13V2C1.5 1.73478 1.60536 1.48043 1.79289 1.29289C1.98043 1.10536 2.23478 1 2.5 1H7.5L12.5 6V13Z"
          stroke="#F6F6F6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4.5 5H6.5"
          stroke="#F6F6F6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4.5 8H9.5"
          stroke="#F6F6F6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4.5 11H9.5"
          stroke="#F6F6F6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_18_230">
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
