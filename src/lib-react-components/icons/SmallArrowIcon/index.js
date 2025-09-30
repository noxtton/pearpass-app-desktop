import { html } from 'htm/react'

import { getIconProps } from '../../utils/getIconProps'

/**
 * @param {{
 *  size?: string;
 *  width?: string;
 *  height?: string;
 *  color?: string;
 * }} props
 */
export const SmallArrowIcon = (props) => {
  const { width, height, color } = getIconProps(props)

  return html`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width=${width}
      height=${height}
      viewBox="0 0 10 7"
      fill="none"
    >
      <path
        d="M5 2.63867L1.0625 6.57617L0 5.51367L5 0.513672L10 5.51367L8.9375 6.57617L5 2.63867Z"
        fill=${color}
      />
    </svg>
  `
}
