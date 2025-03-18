import { createContext, useState, useContext, useEffect } from 'react'

import { html } from 'htm/react'

import { LoadingOverlay } from '../components/LoadingOverlay'

const ToastContext = createContext()

/**
 * @param {{
 *  children: import('react').ReactNode
 * }} props
 */
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)

  return html`
    <${ToastContext.Provider} value=${{ isLoading, setIsLoading }}>
        ${children}
        ${isLoading && html`<${LoadingOverlay} />`}
    </${ToastContext.Provider}>
  `
}

/**
 * @returns {{
 *  isLoading: boolean,
 *  setIsLoading: (isLoading: boolean) => void
 * }}
 */
export const useLoadingContext = () => {
  return useContext(ToastContext)
}

/**
 * @param {{
 *  isLoading: boolean
 * }} props
 */
export const useGlobalLoading = ({ isLoading }) => {
  const { setIsLoading } = useLoadingContext()

  useEffect(() => {
    if (typeof isLoading !== 'boolean') {
      return
    }

    setIsLoading(isLoading)
  }, [isLoading])
}
