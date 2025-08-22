import { html } from 'htm/react'
import { YellowErrorIcon } from 'pearpass-lib-ui-react-components'

import { Container } from './styles'

export const NoticeContainer = ({ text }) => html`
  <${Container}>
    <${YellowErrorIcon} size="19" />
    ${text}
  <//>
`
