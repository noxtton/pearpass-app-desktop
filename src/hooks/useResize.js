import { useState, useEffect } from 'react'
import { useThrottle } from './useThrottle'

/**
 * @typedef UseResizeProps
 * @property {number} delay - The debounce delay in milliseconds.
 */

/**
 * @param {UseResizeProps} param
 */

/**
 * @returns {{ windowWidth: number }}
 */

export const useResize = (delay = 300) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const debouncedWidth = useThrottle(windowWidth, delay)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return { windowWidth: debouncedWidth }
}
