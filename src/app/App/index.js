import { useEffect } from 'react'

import { html } from 'htm/react'
import { useUserData } from 'pearpass-lib-vault'

import { useRouter } from '../../context/RouterContext'
import { useSimulatedLoading } from '../../hooks/useSimulatedLoading'
import { Routes } from '../Routes'

export const App = () => {
  const { navigate } = useRouter()

  const isSimulatedLoading = useSimulatedLoading()

  const { isLoading: isUserDataLoading, refetch: refetchUser } = useUserData()

  const isLoading = isUserDataLoading || isSimulatedLoading

  useEffect(() => {
    ;(async () => {
      const userData = await refetchUser()

      if (userData?.hasPasswordSet) {
        navigate('welcome', {
          state: 'masterPassword'
        })
      } else {
        navigate('intro')
      }
    })()
  }, [])

  return html` <${Routes} isLoading=${isLoading} /> `
}
