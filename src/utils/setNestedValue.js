import { getPathArray } from './getPathArray'

export const setNestedValue = (obj, path, value) => {
  if (!obj) return

  const result = { ...obj }

  const pathArray = getPathArray(path)

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
