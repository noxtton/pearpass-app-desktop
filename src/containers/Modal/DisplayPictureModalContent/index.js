import { html } from 'htm/react'

import { ModalContent } from '../ModalContent'
import { Content, HeaderContainer, Name } from './styles'
import { useModal } from '../../../context/ModalContext'

export const DisplayPictureModalContent = ({ url, name }) => {
  const { closeModal } = useModal()

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
