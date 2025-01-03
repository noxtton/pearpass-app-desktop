import { useRef } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { ButtonSecondary, ImageIcon } from 'pearpass-lib-ui-react-components'

import { useModal } from '../../../context/ModalContext'
import { ModalContent } from '../ModalContent'
import { ContentWrapper, HeaderWrapper, HiddenInput } from './styles'
import { FileDropArea } from '../../../components/FileDropArea'

export const UploadImageModalContent = () => {
  const fileInputRef = useRef(null)

  const { i18n } = useLingui()
  const { closeModal } = useModal()

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event) => {
    const files = event.target.files

    console.log(files)
  }

  return html`
    <${ModalContent}
      onClose=${closeModal}
      headerChildren=${html`
        <${HeaderWrapper}>
          <${ImageIcon} size="21" />

          ${i18n._('Upload picture')}
        <//>
      `}
    >
      <${ContentWrapper}>
        <${FileDropArea} label=${i18n._('Drop picture here...')} />
      <//>

      <${ButtonSecondary} onClick=${handleBrowseClick}>
        ${i18n._('Browse folders')}
      <//>

      <${HiddenInput}
        ref=${fileInputRef}
        type="file"
        onChange=${handleFileChange}
      />
    <//>
  `
}
