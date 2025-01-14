/**
 * @returns {string}
 */
export const generateUniqueId = () =>
  new Date().getTime().toString(36) + Math.random().toString(36).substring(2)
