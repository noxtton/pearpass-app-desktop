import { useState, useEffect } from 'react'

import { SECONDS_IN_A_MINUTE } from '../constants/time'

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
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timeLeft])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / SECONDS_IN_A_MINUTE)
    const remainingSeconds = seconds % SECONDS_IN_A_MINUTE
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return formatTime(timeLeft)
}

export default useCountDown
