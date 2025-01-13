/**
 * @param {string} name
 * @returns {string}
 */
export const generateAvatarInitials = (name) => {
  const nameParts = name.split(' ')

  if (nameParts.length === 1) {
    return nameParts[0].slice(0, 2).toUpperCase()
  }

  return nameParts.map((part) => part[0].toUpperCase()).join('')
}
