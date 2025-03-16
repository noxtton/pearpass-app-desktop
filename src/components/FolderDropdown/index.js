import React from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { StarIcon } from 'pearpass-lib-ui-react-components'
import { useFolders } from 'pearpass-lib-vault'

import { MenuDropdown } from '../MenuDropdown'

/**
 * @param {{
 *  selectedFolder?: {
 *    name: string;
 *    icon?: React.ReactNode;
 *  },
 *  onFolderSelect: (folder: {
 *    name: string;
 *    icon?: React.ReactNode;
 *   }) => void
 * }} props
 */
export const FolderDropdown = ({ selectedFolder, onFolderSelect }) => {
  const { data: folders } = useFolders()

  const { i18n } = useLingui()

  const customFolders = React.useMemo(
    () =>
      Object.values(folders?.customFolders ?? {}).map((folder) => {
        return { name: folder.name }
      }),
    [folders]
  )

  const isFavorite = selectedFolder === 'favorites'
  const name = isFavorite ? i18n._('Favorite') : selectedFolder
  const icon = isFavorite ? StarIcon : undefined

  return html`
    <${MenuDropdown}
      selectedItem=${{ name, icon }}
      onItemSelect=${onFolderSelect}
      items=${customFolders}
    />
  `
}
