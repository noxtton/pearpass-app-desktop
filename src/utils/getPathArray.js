/**
 * @param {string | string[]} path
 * @returns {string[]}
 */
export const getPathArray = (path) => {
  return Array.isArray(path)
    ? path
    : path.replace(/\[(\w+)\]/g, '.$1').split('.')
}
