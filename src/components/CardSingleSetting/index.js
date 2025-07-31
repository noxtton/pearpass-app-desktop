import { html } from 'htm/react'

import { Container, Description, Header, Title } from './styles'

/**
 * @param {{
 *  title: string
 *  description?: string
 *  children: import('react').ReactNode
 * }} props
 */
export const CardSingleSetting = ({ title, description, children }) => html`
  <${Container}>
    <${Header}>
      <${Title}>${title}<//>
    <//>
    ${description && html` <${Description}>${description}<//> `}
    <div>${children}<//>
  <//>
`
