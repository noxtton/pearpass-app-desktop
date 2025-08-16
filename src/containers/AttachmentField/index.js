import { html } from 'htm/react'
import { CommonFileIcon } from 'pearpass-lib-ui-react-components'

import {
  AdditionalItems,
  AttachmentName,
  IconWrapper,
  InputAreaWrapper,
  Label,
  MainWrapper,
  Wrapper
} from './styles'

export const AttachmentField = ({ attachment, label, additionalItems }) => {
  const handleDownload = (e) => {
    e.stopPropagation()
    if (attachment && attachment.buffer && attachment.name) {
      const blob = new Blob([attachment.buffer])
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = attachment.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  return html`
    <${Wrapper}>
      <${IconWrapper}> <${CommonFileIcon} size="21" /> <//>
      <${MainWrapper}>
        <${Label}> ${label} <//>

        <${InputAreaWrapper}>
          <${AttachmentName} href="#" onClick=${handleDownload}>
            ${attachment.name}
          <//>
        <//>
      <//>

      ${!!additionalItems &&
      html`
        <${AdditionalItems} onMouseDown=${(e) => e.stopPropagation()}>
          ${additionalItems}
        <//>
      `}
    <//>
  `
}
