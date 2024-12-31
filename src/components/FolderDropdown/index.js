import { html } from 'htm/react'
import {
  DropDown,
  DropDownItem,
  FolderIconWrapper,
  Label,
  MainWrapper,
  Wrapper
} from './styles'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  FolderIcon
} from 'pearpass-lib-ui-react-components'
import { useLingui } from '@lingui/react'
import { useState } from 'react'
import { useOutsideClick } from '../../hooks/useOutsideClick'

const FOLDER_NAMES = ['Games', 'Work', 'Trip', 'Social Media']

/**
 * @property {
 *  {
 *    selectedFolder: string,
 *    onFolderSelect: (folder: string) => void
 *  }
 * }
 */
export const FolderDropdown = ({ selectedFolder, onFolderSelect }) => {
  const { i18n } = useLingui()

  const [isOpen, setIsOpen] = useState(false)

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
          <${FolderIcon} width="14" />
        <//>

        ${folder}
      <//>
    `
  }

  const renderLabel = (isHidden) => {
    return html`
      <${Label} isHidden=${isHidden} onClick=${() => setIsOpen(!isOpen)}>
        <${isOpen ? ArrowUpIcon : ArrowDownIcon} width="14" />

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
          ${FOLDER_NAMES.map((folder) =>
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
