import { useEffect, useRef } from 'react'

import { MS_PER_MINUTE } from 'pearpass-lib-constants'
import { closeAllInstances, useUserData, useVaults } from 'pearpass-lib-vault'

import { useLoadingContext } from '../context/LoadingContext'
import { useRouter } from '../context/RouterContext'

/**
 * @param {Object} options - Configuration options for inactivity detection.
 * @param {number} [options.timeoutMs=60000] - Timeout duration in milliseconds before triggering inactivity actions.
 * @returns {void}
 */
export function useInactivity({ timeoutMs = 5 * MS_PER_MINUTE } = {}) {
  const { setIsLoading } = useLoadingContext()
  const { navigate } = useRouter()
  const { refetch: refetchUser } = useUserData()

  const { resetState } = useVaults()
  const timerRef = useRef(null)

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(async () => {
      const userData = await refetchUser()

      if (userData.isLoggedIn || userData.isVaultOpen) {
        return
      }

      setIsLoading(true)
      await closeAllInstances()
      navigate('welcome', { state: 'masterPassword' })
      resetState()
      setIsLoading(false)
    }, timeoutMs)
  }

  const activityEvents = [
    'mousemove',
    'keydown',
    'mousedown',
    'touchstart',
    'scroll'
  ]

  useEffect(() => {
    activityEvents.forEach((event) =>
      window.addEventListener(event, resetTimer)
    )
    resetTimer()

    return () => {
      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      )
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])
}
