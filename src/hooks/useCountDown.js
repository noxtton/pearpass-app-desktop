import { useState, useEffect } from 'react'

import { MS_PER_SECOND, SECONDS_PER_MINUTE } from '../constants/time'

/**
 * @param {{
 *  initialSeconds: number,
 *  onFinish?: () => void
 * }} params
 * @returns {string}
 */
export const useCountDown = ({ initialSeconds, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds)

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinish?.()

      return
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, MS_PER_SECOND)

    return () => {
      clearInterval(intervalId)
    }
  }, [timeLeft])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / SECONDS_PER_MINUTE)
    const remainingSeconds = seconds % SECONDS_PER_MINUTE

    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return formatTime(timeLeft)
}

export default useCountDown
