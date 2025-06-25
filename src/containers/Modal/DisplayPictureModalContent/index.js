import { html } from 'htm/react'
import { ShareIcon } from 'pearpass-lib-ui-react-components'
import { colors } from 'pearpass-lib-ui-theme-provider'

import { ModalContent } from '../ModalContent'
import { Content, HeaderContainer, Name, ShareIconWrapper } from './styles'
import { useModal } from '../../../context/ModalContext'

export const DisplayPictureModalContent = ({ url, name }) => {
  const { closeModal } = useModal()

  return html`
    <${ModalContent}
      onClose=${closeModal}
      headerChildren=${html`
        <${HeaderContainer}>
          <${Name}>${name}<//>
          <${ShareIconWrapper}>
            <${ShareIcon} size="20" color=${colors.primary400.option2} />
          <//>
        <//>
      `}
    >
      <${Content}>
        <img src=${url} alt=${name} />
      <//>
    <//>
  `
}
