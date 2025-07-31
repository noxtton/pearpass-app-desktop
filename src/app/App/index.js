import { useEffect } from 'react'

import { html } from 'htm/react'
import { useUserData } from 'pearpass-lib-vault'

import { useRouter } from '../../context/RouterContext'
import { useInactivity } from '../../hooks/useInactivity'
import { useSimulatedLoading } from '../../hooks/useSimulatedLoading'
import { Routes } from '../Routes'

export const App = () => {
  const { navigate } = useRouter()

  const isSimulatedLoading = useSimulatedLoading()

  const { isLoading: isUserDataLoading, refetch: refetchUser } = useUserData()

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

  return html` <${Routes} isLoading=${isLoading} /> `
}
