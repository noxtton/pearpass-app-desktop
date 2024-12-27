import { useState, useEffect } from 'react'
import { useDebounce } from './useDebounce'

/**
 * @typedef UseResizeProps
 * @property {number} minWidth - The minimum width of the tablet breakpoint.
 * @property {number} maxWidth - The maximum width of the tablet breakpoint.
 * @property {number} delay - The debounce delay in milliseconds.
 */

/**
 * @param {UseResizeProps} param
 */

export const useResize = (minWidth = 0, maxWidth = 1024, delay = 300) => {
  const [isTablet, setIsTablet] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const debouncedWidth = useDebounce(windowWidth, delay)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    setIsTablet(debouncedWidth >= minWidth && debouncedWidth <= maxWidth)
  }, [debouncedWidth, minWidth, maxWidth])

  return { isTablet }
}
