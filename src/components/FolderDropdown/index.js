import React, { useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  FolderIcon
} from 'pearpass-lib-ui-react-components'

import {
  DropDown,
  DropDownItem,
  FolderIconWrapper,
  Label,
  MainWrapper,
  Wrapper
} from './styles'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { useFolders } from '../../vault/hooks/useFolders'

/**
 * @param {{
 *    selectedFolder?: string,
 *    onFolderSelect: (folder: string) => void
 *  }} props
 */
export const FolderDropdown = ({ selectedFolder, onFolderSelect }) => {
  const { i18n } = useLingui()

  const [isOpen, setIsOpen] = useState(false)

  const { data } = useFolders()

  const customFolders = React.useMemo(
    () =>
      Object.values(data?.customFolders ?? {})
        .map((folder) => folder.name)
        .filter((folder) => folder !== selectedFolder),
    [data, selectedFolder]
  )

  const wrapperRef = useOutsideClick({
    onOutsideClick: () => {
      setIsOpen(false)
    }
  })

  const handleFolderSelect = (folder) => {
    onFolderSelect(folder)

    setIsOpen(false)
  }

  const renderDropDownItem = ({ folder, onClick }) => {
    return html`
      <${DropDownItem} onClick=${() => onClick?.()}>
        <${FolderIconWrapper}>
          <${FolderIcon} size="14" />
        <//>

        ${folder}
      <//>
    `
  }

  const renderLabel = (isHidden) => {
    return html`
      <${Label} isHidden=${isHidden} onClick=${() => setIsOpen(!isOpen)}>
        <${isOpen ? ArrowUpIcon : ArrowDownIcon} size="14" />

        ${selectedFolder
          ? renderDropDownItem({
              folder: selectedFolder
            })
          : i18n._('No folder')}
      <//>
    `
  }

  return html`
    <${MainWrapper} ref=${wrapperRef}>
      ${renderLabel(true)}

      <${Wrapper} isOpen=${isOpen}>
        ${renderLabel()}
        ${isOpen &&
        html`<${DropDown}>
          ${customFolders.map((folder) =>
            renderDropDownItem({
              folder,
              onClick: () => handleFolderSelect(folder)
            })
          )}
        <//>`}
      <//>
    <//>
  `
}
