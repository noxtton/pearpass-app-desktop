import { html } from 'htm/react'
import { createContext, useState, useContext } from 'react'

const ModalContext = createContext()

/**
 * @typedef ModalProviderProps
 * @property {import('react').ReactNode} children React node to be rendered inside
 */

/**
 *
 * @param {ModalProviderProps} props
 */

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => setIsOpen(false)

  return html`
    <${ModalContext.Provider} value=${{ isOpen, openModal, closeModal }}>
      ${children}
    </${ModalContext.Provider}>
  `
}

/**
 * @returns {{
 *   isOpen: boolean,
 *   openModal: () => void,
 *   closeModal: () => void
 * }}
 */
export const useModal = () => {
  return useContext(ModalContext)
}
