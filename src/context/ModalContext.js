import { createContext, useState, useContext, useEffect } from 'react'

import { html } from 'htm/react'
import { generateUniqueId } from 'pear-apps-utils-generate-unique-id'

import { Overlay } from '../components/Overlay'
import { BASE_TRANSITION_DURATION } from '../constants/transitions'
import { ModalWrapper } from '../containers/Modal'
import { SideDrawer } from '../containers/Modal/SideDrawer'

const ModalContext = createContext()

const getTopModal = (modalStack) => modalStack[modalStack.length - 1]

const DEFAULT_MODAL_PARAMS = {
  hasOverlay: true,
  overlayType: 'default',
  modalType: 'default',
  closable: true,
  replace: false
}

/**
 * @param {{
 *  children: import('react').ReactNode
 * }} props
 */
export const ModalProvider = ({ children }) => {
  const [modalStack, setModalStack] = useState([])

  const isOpen = !!modalStack.length

  const setModal = (content, params) => {
    setModalStack((prevState) => {
      if (params?.replace) {
        return [
          {
            content,
            id: generateUniqueId(),
            isOpen: true,
            params: { ...DEFAULT_MODAL_PARAMS, ...params }
          }
        ]
      }

      return [
        ...prevState,
        {
          content,
          id: generateUniqueId(),
          isOpen: true,
          params: { ...DEFAULT_MODAL_PARAMS, ...params }
        }
      ]
    })
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
        const topModal = getTopModal(modalStack)
        if (topModal?.params?.closable !== false) {
          void closeModal()
        }
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
      ${modalStack?.map(
        ({ content, id, isOpen, params }) => html`
          <${ModalWrapper} key=${id}>
            ${params.hasOverlay &&
            html`<${Overlay}
              onClick=${params?.closable ? closeModal : undefined}
              type=${params.overlayType}
              isOpen=${isOpen}
            /> `}
            ${params.modalType === 'sideDrawer' &&
            html`<${SideDrawer} isOpen=${isOpen}> ${content} <//>`}
            ${params.modalType === 'default' && isOpen && content}
          <//>
        `
      )}
    <//>
  `
}

/**
 * @returns {{
 *   isOpen: boolean,
 *   setModal: () => void,
 *   closeModal: () => void
 * }}
 */
export const useModal = () => useContext(ModalContext)
