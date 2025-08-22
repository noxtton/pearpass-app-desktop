import { useEffect, useState } from 'react'

import { useUserData } from 'pearpass-lib-vault'

import { LOCAL_STORAGE_KEYS } from '../../../constants/localStorage'
import { useRouter } from '../../../context/RouterContext'
import { logger } from '../../../utils/logger'

/**
 * @returns {Object} An object containing:
 * @property {boolean} isLoading - Indicates if the user data is currently loading.
 */
export const useRedirect = () => {
  const [isLoading, setIsLoading] = useState(true)

  const { navigate } = useRouter()

  const { refetch: refetchUser } = useUserData()

  useEffect(() => {
    ;(async () => {
      try {
        setIsLoading(true)
        const userData = await refetchUser()

        if (!userData?.hasPasswordSet) {
          navigate('intro')
          return
        }

        const isTouAccepted =
          localStorage.getItem(LOCAL_STORAGE_KEYS.TOU_ACCEPTED) === 'true'

        if (!isTouAccepted) {
          navigate('termsOfUse')
          return
        }

        navigate('welcome', {
          state: userData?.hasPasswordSet
            ? 'masterPassword'
            : 'createMasterPassword'
        })
      } catch (error) {
        logger.error('Error fetching user data:', error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  return {
    isLoading
  }
}
