import { html } from 'htm/react'

import { useInactivity } from './hooks/useInactivity'
import { useSimulatedLoading } from '../../hooks/useSimulatedLoading'
import { Routes } from '../Routes'
import { useRedirect } from './hooks/useRedirect'

export const App = () => {
  const isSimulatedLoading = useSimulatedLoading()

  useInactivity()
  const { isLoading } = useRedirect()

  return html` <${Routes} isLoading=${isLoading || isSimulatedLoading} /> `
}
