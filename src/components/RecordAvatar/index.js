import { html } from 'htm/react'
import { CheckIcon, PinIcon } from 'pearpass-lib-ui-react-components'
import { colors } from 'pearpass-lib-ui-theme-provider'

import {
  AvatarAlt,
  AvatarContainer,
  Pin,
  SelectedAvatarContainer
} from './styles'

/**
 * @param {{
 *  avatarSrc: string,
 *  initials: string,
 *  size: 'md' | 'sm',
 *  isSelected: boolean,
 *  isPinned: boolean,
 *  color: string
 * }} props
 */
export const RecordAvatar = ({
  avatarSrc,
  initials,
  size = 'md',
  isSelected = false,
  isPinned = false,
  color
}) => {
  const avatar = avatarSrc
    ? html`<img src=${avatarSrc} />`
    : html`<${AvatarAlt} color=${color} size=${size}> ${initials} <//>`

  if (isSelected) {
    return html`<${SelectedAvatarContainer}>
      <${CheckIcon} size="21" color=${colors.black.mode1} />
    <//>`
  }

  return html`<${AvatarContainer} size=${size}>
    ${avatar}
    ${isPinned &&
    html` <${Pin}><${PinIcon} size="9" color=${colors.primary400.mode1} /><//>`}
  <//>`
}
