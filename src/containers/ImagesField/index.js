import { html } from 'htm/react'
import {
  DeleteIcon,
  ImageIcon,
  PlusIcon
} from 'pearpass-lib-ui-react-components'
import { colors } from 'pearpass-lib-ui-theme-provider'

import {
  AddContainer,
  Body,
  Container,
  DeleteIconWrapper,
  DeleteOverlay,
  Header,
  ImageContainer,
  Photo,
  Title
} from './styles'
import { useModal } from '../../context/ModalContext'
import { DisplayPictureModalContent } from '../Modal/DisplayPictureModalContent'

export const ImagesField = ({ title, pictures = [], onAdd, onRemove }) => {
  const { setModal } = useModal()

  const handlePictureClick = (url, name) => {
    setModal(html`<${DisplayPictureModalContent} url=${url} name=${name} />`)
  }

  const handleRemove = (e, index) => {
    e.stopPropagation()
    onRemove?.(index)
  }

  return html`
    <${Container}>
      <${Header}>
        <${ImageIcon} />
        <${Title}>${title}<//>
      <//>
      <${Body}>
        ${pictures?.map((picture, idx) => {
          const url = URL.createObjectURL(new Blob([picture.buffer]))
          return html`
            <${ImageContainer}
              onClick=${() => handlePictureClick(url, picture.name)}
              key=${idx}
            >
              <${Photo} src=${url} alt="attachment" />

              ${onRemove &&
              html`<${DeleteOverlay}>
                <${DeleteIconWrapper} onClick=${(e) => handleRemove(e, idx)}>
                  <${DeleteIcon} size="24" color=${colors.black.mode1} />
                <//>
              <//>`}
            <//>
          `
        })}
        ${!!onAdd &&
        html` <${AddContainer} onClick=${onAdd}>
          <${PlusIcon} color=${colors.primary400.mode1} />
        <//>`}
      <//>
    <//>
  `
}
