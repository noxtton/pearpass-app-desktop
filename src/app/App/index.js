import { useEffect } from 'react'

import { html } from 'htm/react'

import { useRouter } from '../../context/RouterContext'
import { usePearUpdate } from '../../hooks/usePearUpdate'
import { useSimulatedLoading } from '../../hooks/useSimulatedLoading'
import { Routes } from '../Routes'
import { useInactivity } from './hooks/useInactivity'
import { useRedirect } from './hooks/useRedirect'

export const App = () => {
  usePearUpdate()
  const isSimulatedLoading = useSimulatedLoading()

  useInactivity()
  const { isLoading } = useRedirect()

  const { navigate } = useRouter()

  useEffect(() => {
    const handleExtensionExit = async () => {
      navigate('welcome', { state: 'masterPassword' })
    }

    window.addEventListener('extension-exit', handleExtensionExit)
    return () => {
      window.removeEventListener('extension-exit', handleExtensionExit)
    }
  }, [navigate])

  return html` <${Routes} isLoading=${isLoading || isSimulatedLoading} /> `
}
