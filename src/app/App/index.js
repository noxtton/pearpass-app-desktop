import { html } from 'htm/react'

import { usePearUpdate } from '../../hooks/usePearUpdate'
import { useSimulatedLoading } from '../../hooks/useSimulatedLoading'
import { Routes } from '../Routes'
import { useInactivity } from './hooks/useInactivity'
import { UseOnExtensionExit } from './hooks/useOnExtensionExit'
import { useRedirect } from './hooks/useRedirect'

export const App = () => {
  usePearUpdate()
  const isSimulatedLoading = useSimulatedLoading()

  useInactivity()
  const { isLoading } = useRedirect()

  UseOnExtensionExit()

  return html` <${Routes} isLoading=${isLoading || isSimulatedLoading} /> `
}
