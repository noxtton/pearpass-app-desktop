import { createContext, useState, useContext } from 'react'

import { html } from 'htm/react'

import { Overlay } from '../components/Overlay'
import { BASE_TRANSITION_DURATION } from '../constants/transitions'
import { ModalWrapper } from '../containers/Modal'
import { SideDrawer } from '../containers/Modal/SideDrawer'

const ModalContext = createContext()

/**
 * @param {{
 *  children: import('react').ReactNode
 * }} props
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
        isOpen: true,
        params: {
          hasOverlay: params?.hasOverlay ?? true,
          overlayType: params?.overlayType ?? 'default',
          modalType: params?.modalType ?? 'default'
        }
      }
    ])
  }

  const closeModal = () => {
    setModalStack((prevState) => {
      const newStack = [...prevState]
      newStack[newStack.length - 1].isOpen = false

      return newStack
    })

    setTimeout(() => {
      setModalStack((prevState) => {
        const newStack = [...prevState]
        newStack.pop()

        return newStack
      })
    }, BASE_TRANSITION_DURATION)
  }

  return html`
    <${ModalContext.Provider} value=${{ isOpen, setModal, closeModal }}>
      ${children}

      ${modalStack?.map(({ content, id, isOpen, params }) => {
        return html`
          <${ModalWrapper} key=${id}>
            ${params.hasOverlay &&
            html`<${Overlay}
              onClick=${closeModal}
              type=${params.overlayType}
              isOpen=${isOpen}
            /> `}
            ${params.modalType === 'sideDrawer' &&
            html`<${SideDrawer} isOpen=${isOpen}> ${content} <//>`}
            ${params.modalType === 'default' && isOpen && content}
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
