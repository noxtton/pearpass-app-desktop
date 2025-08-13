import { useEffect } from 'react'

import { useUserData } from 'pearpass-lib-vault'

import { LOCAL_STORAGE_KEYS } from '../../../constants/localStorage'
import { useRouter } from '../../../context/RouterContext'

/**
 * @returns {Object} An object containing:
 * @property {boolean} isLoading - Indicates if the user data is currently loading.
 */
export const useRedirect = () => {
  const { navigate } = useRouter()

  const { isLoading: isUserDataLoading, refetch: refetchUser } = useUserData()

  const isLoading = isUserDataLoading

  useEffect(() => {
    ;(async () => {
      const userData = await refetchUser()

      const isTouAccepted =
        localStorage.getItem(LOCAL_STORAGE_KEYS.TOU_ACCEPTED) === 'true'

      if (!isTouAccepted && userData?.hasPasswordSet) {
        navigate('termsOfUse')
        return
      }

      if (userData?.hasPasswordSet) {
        navigate('welcome', {
          state: 'masterPassword'
        })
        return
      }

      navigate('intro')
    })()
  }, [])

  return {
    isLoading
  }
}
