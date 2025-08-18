import { html } from 'htm/react'

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

  return html` <${Routes} isLoading=${isLoading || isSimulatedLoading} /> `
}
