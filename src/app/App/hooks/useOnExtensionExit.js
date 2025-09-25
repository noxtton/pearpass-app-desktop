import { useEffect } from 'react'

import { useVaults } from 'pearpass-lib-vault'

import { useRouter } from '../../../context/RouterContext'

export const UseOnExtensionExit = () => {
  const { navigate } = useRouter()
  const { resetState } = useVaults()

  useEffect(() => {
    const handleExtensionExit = () => {
      navigate('welcome', { state: 'masterPassword' })
      resetState()
    }

    window.addEventListener('extension-exit', handleExtensionExit)
    return () => {
      window.removeEventListener('extension-exit', handleExtensionExit)
    }
  }, [navigate])
}
