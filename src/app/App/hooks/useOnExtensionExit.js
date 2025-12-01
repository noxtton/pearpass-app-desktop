import { useEffect } from 'react'

import { useVaults } from 'pearpass-lib-vault'

import { NAVIGATION_ROUTES } from '../../../constants/navigation'
import { useRouter } from '../../../context/RouterContext'

export const useOnExtensionExit = () => {
  const { navigate } = useRouter()
  const { resetState } = useVaults()

  useEffect(() => {
    const handleExtensionExit = () => {
      navigate('welcome', { state: NAVIGATION_ROUTES.MASTER_PASSWORD })
      resetState()
    }

    window.addEventListener('extension-exit', handleExtensionExit)
    return () => {
      window.removeEventListener('extension-exit', handleExtensionExit)
    }
  }, [navigate])
}
