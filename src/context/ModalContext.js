import { createContext, useState, useContext } from 'react'

import { html } from 'htm/react'

import { Modal } from '../containers/Modal'
import { ModalOverlay } from '../containers/Modal/ModalOverlay'

const ModalContext = createContext()

/**
 * @typedef ModalProviderProps
 * @property {import('react').ReactNode} children React node to be rendered inside
 */

/**
 * @param {ModalProviderProps} props
 */
export const ModalProvider = ({ children }) => {
  const [modalStack, setModalStack] = useState([])

  const isOpen = !!modalStack.length

  const setModal = (content, params) => {
    setModalStack((prevState) => [
      ...prevState,
      {
        content,
        id: new Date().getTime(),
        params: {
          hasOverlay: params?.hasOverlay ?? true,
          overlayType: params?.overlayType ?? 'default'
        }
      }
    ])
  }

  const closeModal = () => {
    setModalStack((prevState) => {
      const newStack = [...prevState]
      newStack.pop()

      return newStack
    })
  }

  return html`
    <${ModalContext.Provider} value=${{ isOpen, setModal, closeModal }}>
      ${children}

      ${modalStack?.map(({ content, id, params }) => {
        return html`
          <${Modal} key=${id}>
            ${params.hasOverlay &&
            html`
              <${ModalOverlay}
                onClick=${closeModal}
                type=${params.overlayType}
              />
            `}
            ${content}
          <//>
        `
      })}
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
