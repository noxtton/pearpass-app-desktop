import { html } from 'htm/react'

import { Pin } from './styles'
import { generateAvatarInitials } from '../../utils/generateAvatarInitials'
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
