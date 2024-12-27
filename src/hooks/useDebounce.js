import { useState, useEffect } from 'react'

/**
 * @typedef useDebounceProps
 * @property {any} value - The value to debounce.
 * @property {number} delay - The debounce delay in milliseconds.
 */

/**
 * @param {useDebounceProps}
 */

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
