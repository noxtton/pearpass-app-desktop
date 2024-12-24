import { html } from 'htm/react'
import { createContext, useState, useContext } from 'react'

const RouterContext = createContext()

export const RouterProvider = ({ children }) => {
  const [state, setState] = useState({
    currentPage: 'welcome',
    params: {},
    query: {}
  })

  const navigate = (page, params = {}, query = {}) => {
    setState({ currentPage: page, params, query })
  }

  return html`
    <${RouterContext.Provider} value=${{ ...state, navigate }}>
        ${children}
    </${RouterContext.Provider}>
  `
}

/**
 * @returns {{
 *   currentPage: string,
 *   params: Object.<string, any>,
 *   query: Object.<string, any>,
 *   navigate: (currentPage: string, params: Object.<string, any>, query: Object.<string, any>) => void
 * }}
 */
export const useRouter = () => {
  return useContext(RouterContext)
}
