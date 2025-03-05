import { createContext, useState, useContext, useEffect } from 'react'

import { html } from 'htm/react'

import { Overlay } from '../components/Overlay'
import { BASE_TRANSITION_DURATION } from '../constants/transitions'
import { ModalWrapper } from '../containers/Modal'
import { SideDrawer } from '../containers/Modal/SideDrawer'
import { generateUniqueId } from '../utils/generateUniqueId'

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
        id: generateUniqueId(),
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

      if (newStack?.[newStack?.length - 1]?.isOpen) {
        newStack[newStack.length - 1].isOpen = false
      }

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

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [isOpen])

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
