import { useState, useEffect, useRef } from 'react'

/**
 * @typedef UseThrottleProps
 * @property {any} value - The value to throttle.
 * @property {number} delay - The throttle delay in milliseconds.
 * @returns {any}
 */

/**
 * @param {UseThrottleProps}
 */

export const useThrottle = (value, delay) => {
  const [throttledValue, setThrottledValue] = useState(value)
  const lastExecuted = useRef(0)

  useEffect(() => {
    const now = Date.now()

    if (now - lastExecuted.current >= delay) {
      setThrottledValue(value)
      lastExecuted.current = now
    } else {
      const timeout = setTimeout(
        () => {
          setThrottledValue(value)
          lastExecuted.current = Date.now()
        },
        delay - (now - lastExecuted.current)
      )

      return () => clearTimeout(timeout)
    }
  }, [value, delay])

  return throttledValue
}
