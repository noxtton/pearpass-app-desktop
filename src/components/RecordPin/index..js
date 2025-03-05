import { html } from 'htm/react'
import { generateAvatarInitials } from 'pear-apps-utils-avatar-initials'

import { Pin } from './styles'
import { RecordAvatar } from '../RecordAvatar'

/**
 * @param {{
 *  name: string
 *  avatarSrc: string
 *  onClick: () => void
 * }} props
 */
export const RecordPin = ({ name, avatarSrc, onClick }) => {
  return html`
    <${Pin} onClick=${() => onClick()}>
      <${RecordAvatar}
        avatarSrc=${avatarSrc}
        initials=${generateAvatarInitials(name)}
        size="sm"
      />
      ${name}
    <//>
  `
}
