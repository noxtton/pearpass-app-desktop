import { html } from 'htm/react'

import { Container, Content, Header, Title } from './styles'

export const CardSingleSetting = ({ title, children }) => {
  return html`
    <${Container}>
      <${Header}>
        <${Title}>${title}<//>
      <//>
      <${Content}>${children}<//>
    <//>
  `
}
