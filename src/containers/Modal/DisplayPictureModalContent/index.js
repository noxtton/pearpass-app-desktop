import { useEffect } from 'react'

import { html } from 'htm/react'

import { ModalContent } from '../ModalContent'
import { Content, HeaderContainer, Name } from './styles'
import { useModal } from '../../../context/ModalContext'

export const DisplayPictureModalContent = ({ url, name }) => {
  const { closeModal } = useModal()

  useEffect(
    () => () => {
      URL.revokeObjectURL(url)
    },
    [url]
  )

  return html`
    <${ModalContent}
      onClose=${closeModal}
      headerChildren=${html`
        <${HeaderContainer}>
          <${Name}>${name}<//>
        <//>
      `}
    >
      <${Content}>
        <img src=${url} alt=${name} />
      <//>
    <//>
  `
}
