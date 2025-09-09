import { html } from 'htm/react'

import { IconWrapper, Container, Message } from './styles'
import { ErrorIcon, YellowErrorIcon } from '../../lib-react-components'

export const AlertBox = ({ message, type = 'warning' }) => html`
  <${Container} type=${type}>
    <${IconWrapper}>
      <${type === 'warning' ? YellowErrorIcon : ErrorIcon} size="18" />
    <//>

    <${Message}> ${message} <//>
  <//>
`
