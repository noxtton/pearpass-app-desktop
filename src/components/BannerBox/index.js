import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  ButtonPrimary,
  ButtonRoundIcon,
  XIcon
} from 'pearpass-lib-ui-react-components'

import {
  CloseButtonWrapper,
  Container,
  HighlightedDescription,
  Message,
  Title
} from './styles'

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
