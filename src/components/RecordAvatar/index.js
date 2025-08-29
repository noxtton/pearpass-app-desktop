import { useMemo } from 'react'

import { html } from 'htm/react'
import { CheckIcon, StarIcon } from 'pearpass-lib-ui-react-components'
import { colors } from 'pearpass-lib-ui-theme-provider'
import { getDefaultFavicon } from 'pearpass-lib-vault'

import {
  AvatarAlt,
  AvatarContainer,
  AvatarImage,
  FavoriteIcon,
  SelectedAvatarContainer
} from './styles'
import { extractDomainName } from '../../utils/extractDomainName'

/**
 * @param {{
 *  websiteDomain: string,
 *  initials: string,
 *  size: 'md' | 'sm',
 *  isSelected: boolean,
 *  isFavorite: boolean,
 *  color: string
 * }} props
 */
export const RecordAvatar = ({
  websiteDomain,
  initials,
  size = 'md',
  isSelected = false,
  isFavorite = false,
  color
}) => {
  const avatarSrc = useMemo(() => {
    if (!websiteDomain) {
      return null
    }

    const website = extractDomainName(websiteDomain)
    const avatarBuffer = getDefaultFavicon(website) || null
    return avatarBuffer ? URL.createObjectURL(new Blob([avatarBuffer])) : null
  }, [websiteDomain])

  const avatar = avatarSrc
    ? html`<${AvatarImage} src=${avatarSrc} />`
    : html`<${AvatarAlt} color=${color} size=${size}> ${initials} <//>`

  if (isSelected) {
    return html`<${SelectedAvatarContainer}>
      <${CheckIcon} size="21" color=${colors.black.mode1} />
    <//>`
  }

  return html`<${AvatarContainer} size=${size}>
    ${avatar}
    ${isFavorite &&
    html` <${FavoriteIcon}>
      <${StarIcon} size="18" fill=${true} color=${colors.primary400.mode1} />
    <//>`}
  <//>`
}
