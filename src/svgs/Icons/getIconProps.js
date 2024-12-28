import { colors } from 'pearpass-lib-ui-theme-provider'

/**
 * @typedef GetIconProps
 * @property {string} [width] width of the svg (optional)
 * @property {string} [height] height of the svg (optional)
 * @property {string} [color] color of the svg (optional)
 */

/**
 * @param {ErrorIconProps} props
 * @returns {GetIconProps}
 */

export const getIconProps = ({
  size = '14',
  height,
  width,
  color = colors.white.mode1
}) => {
  return {
    size: size,
    height: size || height,
    width: size || width,
    color: color
  }
}
