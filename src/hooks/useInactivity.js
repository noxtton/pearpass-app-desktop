import { useEffect, useRef } from 'react'

import { closeAllInstances, useVaults } from 'pearpass-lib-vault'

import { useLoadingContext } from '../context/LoadingContext'
import { useRouter } from '../context/RouterContext'

export function useInactivity({ timeoutMs = 60 * 1000 }) {
  const { setIsLoading } = useLoadingContext()
  const { currentPage, data, navigate } = useRouter()
  const { resetState } = useVaults()
  const timerRef = useRef(null)

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(async () => {
      if (currentPage === 'welcome' && data?.state === 'masterPassword') {
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
    // Handler for IPC activity
    const handleIPCActivity = () => resetTimer()

    // Listen for DOM events
    activityEvents.forEach((event) =>
      window.addEventListener(event, resetTimer)
    )

    // Listen for IPC activity events
    window.addEventListener('ipc-activity', handleIPCActivity)

    resetTimer()

    return () => {
      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      )
      window.removeEventListener('ipc-activity', handleIPCActivity)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return {
    resetInactivity: resetTimer
  }
}
