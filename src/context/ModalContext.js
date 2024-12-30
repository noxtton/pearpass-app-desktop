import { html } from 'htm/react'
import { createContext, useState, useContext } from 'react'
import { Modal } from '../containers/Modal'
import { ModalOverlay } from '../containers/Modal/ModalOverlay'

const ModalContext = createContext()

const INITIAL_STATE = {
  content: null,
  params: {
    hasOverlay: true,
    overlayType: 'default'
  }
}

/**
 * @typedef ModalProviderProps
 * @property {import('react').ReactNode} children React node to be rendered inside
 */

/**
 * @param {ModalProviderProps} props
 */
export const ModalProvider = ({ children }) => {
  const [{ content, params }, setModalData] = useState(INITIAL_STATE)

  const isOpen = !!content

  const setModal = (content, params) => {
    setModalData({
      content,
      params: {
        hasOverlay: params?.hasOverlay ?? true,
        overlayType: params?.overlayType ?? 'default'
      }
    })
  }

  const closeModal = () => {
    setModalData(INITIAL_STATE)
  }

  return html`
    <${ModalContext.Provider} value=${{ isOpen, setModal, closeModal }}>
      ${children}

      ${
        isOpen &&
        html` <${Modal}>
          ${params?.hasOverlay &&
          html`<${ModalOverlay}
            onClick=${closeModal}
            type=${params?.overlayType}
          />`}
          ${content}
        <//>`
      }
    </${ModalContext.Provider}>
  `
}

/**
 * @returns {{
 *   isOpen: boolean,
 *   setModal: () => void,
 *   closeModal: () => void
 * }}
 */
export const useModal = () => {
  return useContext(ModalContext)
}
