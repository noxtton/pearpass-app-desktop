import { html } from 'htm/react'
import { getIconProps } from './getIconProps'
/**
 * @typedef KebabMenuIconProps
 * @property {string} [size] size of the svg (optional)
 * @property {string} [width] width of the svg (optional)
 * @property {string} [height] height of the svg (optional)
 * @property {string} [color] color of the svg (optional)
 */

/**
 * @param {KebabMenuIconProps} props
 */

export const KebabMenuIcon = (props) => {
  const { width, height, color } = getIconProps({
    width: '14',
    height: '15',
    ...props
  })

  return html`
    <svg
      width=${width}
      height=${height}
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_18_338)">
        <rect
          x="5.60004"
          y="0.5"
          width="2.8"
          height="2.8"
          rx="1.4"
          fill=${color}
        />
        <rect
          x="5.59998"
          y="6.10059"
          width="2.8"
          height="2.8"
          rx="1.4"
          fill=${color}
        />
        <rect
          x="5.59998"
          y="11.7002"
          width="2.8"
          height="2.8"
          rx="1.4"
          fill=${color}
        />
      </g>
      <defs>
        <clipPath id="clip0_18_338">
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
