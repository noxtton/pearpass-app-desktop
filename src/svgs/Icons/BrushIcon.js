import { html } from 'htm/react'
import { getIconProps } from './getIconProps'
/**
 * @typedef BrushIconProps
 * @property {string} [size] size of the svg (optional)
 * @property {string} [width] width of the svg (optional)
 * @property {string} [height] height of the svg (optional)
 * @property {string} [color] color of the svg (optional)
 */

/**
 * @param {BrushIconProps} props
 */

export const BrushIcon = (props) => {
  const { width, height, color } = getIconProps({
    width: '14',
    height: '15',
    ...props
  })

  return html`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width=${width}
      height=${height}
      viewBox="0 0 14 15"
      fill="none"
    >
      <path
        d="M6.13 12.5598C4.6 14.0998 2 14.6098 0.5 13.0698C2.5 10.9998 0.5 9.99983 2 8.49983C2.26339 8.20644 2.58383 7.96983 2.94176 7.80448C3.29968 7.63912 3.68757 7.54849 4.0817 7.53811C4.47584 7.52774 4.86796 7.59785 5.23408 7.74415C5.60021 7.89045 5.93266 8.10987 6.21111 8.38901C6.48956 8.66814 6.70817 9.00112 6.85358 9.36761C6.99899 9.73409 7.06813 10.1264 7.0568 10.5205C7.04546 10.9146 6.95388 11.3023 6.78765 11.6598C6.62142 12.0173 6.38404 12.3372 6.09 12.5998L6.13 12.5598Z"
        stroke=${color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.92 1.58026C12.726 1.38756 12.4946 1.23667 12.2401 1.13691C11.9855 1.03715 11.7132 0.990644 11.44 1.00026C11.1669 1.00768 10.8983 1.07096 10.6506 1.18619C10.403 1.30142 10.1815 1.46617 10 1.67026L4.62 7.67026C5.19691 7.7845 5.72436 8.07442 6.13 8.50026C6.49483 8.86361 6.76 9.31475 6.9 9.81026L12.83 4.50026C13.0329 4.31986 13.1969 4.10004 13.3121 3.85419C13.4273 3.60834 13.4912 3.34161 13.5 3.07026C13.511 2.79537 13.4652 2.52116 13.3654 2.26478C13.2656 2.0084 13.114 1.77537 12.92 1.58026V1.58026Z"
        stroke=${color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  `
}
