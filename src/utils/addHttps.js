/**
 * @param {string} url
 * @returns {boolean}
 */
export const addHttps = (url) => {
  return url.startsWith('http://') || url.startsWith('https://')
    ? url
    : `https://${url}`
}
