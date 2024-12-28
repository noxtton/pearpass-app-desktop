import { html } from 'htm/react'
import { getIconProps } from './getIconProps'

/**
 * @typedef FolderIconProps
 * @property {string} [size] size of the svg (optional)
 * @property {string} [width] width of the svg (optional)
 * @property {string} [height] height of the svg (optional)
 * @property {string} [color] color of the svg (optional)
 */

/**
 * @param {FolderIconProps} props
 */

export const FolderIcon = (props) => {
  const { width, height, color } = getIconProps(props)

  return html`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width=${width}
      height=${height}
      viewBox="0 0 14 15"
      fill="none"
    >
      <path
        d="M13.5 6.5C13.5 6.10218 13.342 5.72064 13.0607 5.43934C12.7794 5.15804 12.3978 5 12 5H7L5.56 2H2C1.60218 2 1.22064 2.15804 0.93934 2.43934C0.658035 2.72064 0.5 3.10218 0.5 3.5V11.5C0.5 11.8978 0.658035 12.2794 0.93934 12.5607C1.22064 12.842 1.60218 13 2 13H12C12.3978 13 12.7794 12.842 13.0607 12.5607C13.342 12.2794 13.5 11.8978 13.5 11.5V6.5Z"
        stroke=${color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  `
}
