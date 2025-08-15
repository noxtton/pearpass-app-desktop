import { useEffect } from 'react'

import { html } from 'htm/react'
import { useUserData, useVaults } from 'pearpass-lib-vault'

import { useRouter } from '../../context/RouterContext'
import { useInactivity } from '../../hooks/useInactivity'
import { useSimulatedLoading } from '../../hooks/useSimulatedLoading'
import { Routes } from '../Routes'
import { logger } from "../../utils/logger.js";

export const App = () => {
  const { navigate } = useRouter()

  const isSimulatedLoading = useSimulatedLoading()

  const { isLoading: isUserDataLoading, refetch: refetchUser } = useUserData()
  const { initVaults } = useVaults()

  const isLoading = isUserDataLoading || isSimulatedLoading

  const { resetInactivity } = useInactivity({
    timeoutMs: 5 * 60 * 1000
  })

  useEffect(() => {
    ;(async () => {
      const userData = await refetchUser()

      if (userData?.hasPasswordSet) {
        navigate('welcome', {
          state: 'masterPassword'
        })
        resetInactivity()
      } else {
        navigate('intro')
      }
    })()
  }, [])

  // Listen for extension authentication events
  useEffect(() => {
    const handleExtensionAuth = async () => {
      try {
        await initVaults({})

        navigate('welcome', {
          state: 'vaults'
        })
        resetInactivity()
      } catch (error) {
        logger.error('Error handling extension authentication:', error)

        // If initialization fails, try to refresh user data
        await refetchUser()
      }
    }

    window.addEventListener('extension-authenticated', handleExtensionAuth)
    return () => {
      window.removeEventListener('extension-authenticated', handleExtensionAuth)
    }
  }, [navigate, resetInactivity, initVaults, refetchUser])

  return html` <${Routes} isLoading=${isLoading} /> `
}
