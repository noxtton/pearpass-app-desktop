import { html } from 'htm/react'
import { ErrorIcon, YellowErrorIcon } from 'pearpass-lib-ui-react-components'

import { IconWrapper, Container, Message } from './styles'

export const AlertBox = ({ message, type = 'warning' }) => html`
  <${Container} type=${type}>
    <${IconWrapper}>
      <${type === 'warning' ? YellowErrorIcon : ErrorIcon} size="18" />
    <//>

    <${Message}> ${message} <//>
  <//>
`
