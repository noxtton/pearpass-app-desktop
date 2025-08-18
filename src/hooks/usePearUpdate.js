/** @typedef {import('pear-interface')} */ /* global Pear */

import { useEffect, useRef } from 'react'

import { html } from 'htm/react'

import { UpdateRequiredModalContent } from '../containers/Modal/UpdateRequiredModalContent'
import { useModal } from '../context/ModalContext'

export const usePearUpdate = () => {
  const { setModal } = useModal()
  const modalShownRef = useRef(false)

  const handleUpdateApp = () => {
    Pear.restart({ platform: false })
  }

  useEffect(() => {
    Pear.updates(async (update) => {
      // Check if the update is related to our IPC socket file or debug log
      if (update && update.diff) {
        const hasNonIgnoredChanges = update.diff.some(
          ({ key: file }) =>
            !file.startsWith('/logs') &&
            !file.includes('pearpass-native-messaging.sock')
        )

        if (!hasNonIgnoredChanges) {
          return
        }
      }
      if (!modalShownRef.current) {
        modalShownRef.current = true

        setModal(
          html`<${UpdateRequiredModalContent} onUpdate=${handleUpdateApp} />`,
          { closeable: false }
        )
      }
    })
  }, [])
}
