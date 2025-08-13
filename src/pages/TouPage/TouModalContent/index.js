import { html } from 'htm/react'

import { Title } from './styles'
import { ModalContent } from '../../../containers/Modal/ModalContent'
import { useModal } from '../../../context/ModalContext'

export const TouModalContent = () => {
  const { closeModal } = useModal()

  return html`
    <${ModalContent}
      onClose=${closeModal}
      headerChildren=${html`<${Title}>PearPass Terms of Use<//>`}
    >
      <iframe
        src="/assets/pearpass-tou-30-07-25.html"
        style=${{ width: '100%', height: '75vh', border: 'none' }}
        title="Terms of Use"
      />
    <//>
  `
}
