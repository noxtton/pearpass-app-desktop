import { html } from 'htm/react'

import { Container, Content, Header, Title } from './styles'

/**
 * @param {{
 *  title: string
 *  children: import('react').ReactNode
 * }} props
 */
export const CardSingleSetting = ({ title, children }) => html`
  <${Container}>
    <${Header}>
      <${Title}>${title}<//>
    <//>
    <${Content}>${children}<//>
  <//>
`
