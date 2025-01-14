import { getPathArray } from './getPathArray'

export const getNestedValue = (obj, path, defaultValue) => {
  if (!obj) return defaultValue

  const pathArray = getPathArray(path)

  return pathArray.reduce((acc, key) => {
    return acc && acc[key] !== undefined ? acc[key] : defaultValue
  }, obj)
}
