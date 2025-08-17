import { html } from 'htm/react'

import { useInactivity } from './hooks/useInactivity'
import { useRedirect } from './hooks/useRedirect'
import { useSimulatedLoading } from '../../hooks/useSimulatedLoading'
import { Routes } from '../Routes'

export const App = () => {
  const isSimulatedLoading = useSimulatedLoading()

  useInactivity()
  const { isLoading } = useRedirect()

  return html` <${Routes} isLoading=${isLoading || isSimulatedLoading} /> `
}
