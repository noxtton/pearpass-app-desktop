export const setNestedValue = (obj, path, value) => {
  if (!obj) return

  const result = { ...obj }

  const pathArray = Array.isArray(path)
    ? path
    : path.replace(/\[(\w+)\]/g, '.$1').split('.')

  pathArray.reduce((acc, key, index) => {
    if (index === pathArray.length - 1) {
      acc[key] = value
    } else {
      if (!acc[key] || typeof acc[key] !== 'object') {
        acc[key] = {}
      }
    }
    return acc[key]
  }, result)

  return result
}
