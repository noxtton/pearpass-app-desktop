export const getNestedValue = (obj, path, defaultValue) => {
  if (!obj) return defaultValue

  const pathArray = Array.isArray(path)
    ? path
    : path.replace(/\[(\w+)\]/g, '.$1').split('.')

  return pathArray.reduce((acc, key) => {
    return acc && acc[key] !== undefined ? acc[key] : defaultValue
  }, obj)
}
