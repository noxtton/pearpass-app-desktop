import { useRef } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'

import { ContentWrapper, HiddenInput } from './styles'
import { ButtonSecondary } from '../../lib-react-components'
import { FileDropArea } from '../FileDropArea'

export const FileUploadContent = ({
  accepts,
  isTypeImage,
  handleFileChange
}) => {
  const { i18n } = useLingui()

  const fileInputRef = useRef(null)

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  return html` <${ContentWrapper}>
      <${FileDropArea}
        onFileDrop=${handleFileChange}
        accepts=${accepts}
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
    />`
}
