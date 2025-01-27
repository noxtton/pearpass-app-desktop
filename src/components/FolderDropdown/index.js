import React from 'react'

import { html } from 'htm/react'
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

  const customFolders = React.useMemo(
    () =>
      Object.values(folders?.customFolders ?? {}).map((folder) => {
        return { name: folder.name }
      }),
    [folders]
  )
  return html`
    <${MenuDropdown}
      selectedItem=${{ name: selectedFolder }}
      onItemSelect=${onFolderSelect}
      items=${customFolders}
    />
  `
}
