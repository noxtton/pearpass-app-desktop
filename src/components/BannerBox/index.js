import { html } from 'htm/react'

import {
  CloseButtonWrapper,
  Container,
  HighlightedDescription,
  Message,
  Title
} from './styles'
import {
  ButtonPrimary,
  ButtonRoundIcon,
  XIcon
} from '../../lib-react-components'

export const BannerBox = ({
  onClose,
  isVisible,
  title,
  message,
  highlightedDescription,
  buttonText
}) => {
  if (!isVisible) return null

  return html`
    <${Container}>
      <${Title}>${title} <//>
      <${Message}> ${message} <//>
      <${HighlightedDescription}> ${highlightedDescription} <//>

      <${ButtonPrimary} onClick=${onClose}> ${buttonText} <//>
      <${CloseButtonWrapper}>
        <${ButtonRoundIcon} startIcon=${XIcon} onClick=${onClose} />
      <//>
    <//>
  `
}
