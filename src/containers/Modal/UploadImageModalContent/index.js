import { useRef } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  ButtonSecondary,
  CommonFileIcon,
  ImageIcon
} from 'pearpass-lib-ui-react-components'

import { useModal } from '../../../context/ModalContext'
import { ModalContent } from '../ModalContent'
import { ContentWrapper, HeaderWrapper, HiddenInput } from './styles'
import { FileDropArea } from '../../../components/FileDropArea'

/**
 * @component
 * @param {Object} props
 * @param {'file'|'image'} props.type
 * @returns {JSX.Element}
 */

export const UploadFilesModalContent = ({ accepts, type, onFilesSelected }) => {
  const fileInputRef = useRef(null)

  const isTypeImage = type === 'image'

  const { i18n } = useLingui()
  const { closeModal } = useModal()

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (files) => {
    if (files && files.length > 0) {
      onFilesSelected?.(files)
    }
    closeModal()
  }

  return html`
    <${ModalContent}
      onClose=${closeModal}
      headerChildren=${html`
        <${HeaderWrapper}>
          ${
            isTypeImage
              ? html` <${isTypeImage ? ImageIcon : CommonFileIcon} size="21" />
                  ${i18n._('Upload picture')}`
              : html`
                  <${CommonFileIcon} size="21" />
                  ${i18n._('Upload file')}
                `
          }
        </${HeaderWrapper}>
      `}
    >
      <${ContentWrapper}>
        <${FileDropArea}
          onFileDrop=${handleFileChange}
          label=${isTypeImage
            ? i18n._('Drop picture here...')
            : i18n._('Drop file here...')}
        />
      <//>

      <${ButtonSecondary} onClick=${handleBrowseClick}>
        ${i18n._('Browse folders')}
      <//>

      <${HiddenInput}
        ref=${fileInputRef}
        type="file"
        accept=${accepts}
        onChange=${(event) => handleFileChange(event?.target?.files)}
      />
    <//>
  `
}
