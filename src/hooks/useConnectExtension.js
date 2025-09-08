import { useEffect, useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { CopyIcon } from 'pearpass-lib-ui-react-components'

import { useCopyToClipboard } from './useCopyToClipboard'
import { COPY_FEEDBACK_DISPLAY_TIME } from '../constants/timeConstants'
import { ConnectionStatusModalContent } from '../containers/Modal/ConnectionStatusModalContent'
import { ExtensionPairingModalContent } from '../containers/Modal/ExtensionPairingModalContent'
import { useModal } from '../context/ModalContext'
import { useToast } from '../context/ToastContext'
import { createOrGetPearpassClient } from '../services/createOrGetPearpassClient'
import {
  isNativeMessagingIPCRunning,
  startNativeMessagingIPC,
  stopNativeMessagingIPC
} from '../services/nativeMessagingIPCServer'
import {
  getNativeMessagingEnabled,
  setNativeMessagingEnabled
} from '../services/nativeMessagingPreferences'
import {
  getFingerprint,
  getOrCreateIdentity,
  getPairingCode,
  resetIdentity
} from '../services/security/appIdentity'
import { setupNativeMessaging } from '../utils/nativeMessagingSetup'

export const useConnectExtension = () => {
  const { setModal } = useModal()
  const { setToast } = useToast()
  const { i18n } = useLingui()

  const { copyToClipboard } = useCopyToClipboard({
    onCopy: () => setToast({ message: i18n._('Copied!'), icon: CopyIcon })
  })

  const [isBrowserExtensionEnabled, setIsBrowserExtensionEnabled] =
    useState(getNativeMessagingEnabled() && isNativeMessagingIPCRunning())

  const [enteredExtensionId, setEnteredExtensionId] = useState('')

  const handleSetupExtension = async (extensionId) => {
    if (!extensionId.trim()) {
      setToast({ message: i18n._('Please enter the extension ID') })
      return
    }

    try {
      // Setup native messaging for the extension
      const result = await setupNativeMessaging(extensionId.trim())

      if (result.success) {
        // Start native messaging IPC server
        const client = createOrGetPearpassClient()
        await startNativeMessagingIPC(client)
        setNativeMessagingEnabled(true)
        setIsBrowserExtensionEnabled(true)
        setToast({ message: i18n._('Extension connected successfully!') })
      } else {
        setToast({ message: result.message || i18n._('Setup failed') })
      }
    } catch (error) {
      setToast({ message: i18n._('Error: ') + error.message })
    }
  }

  const handleStopNativeMessaging = async () => {
    await stopNativeMessagingIPC()
    setNativeMessagingEnabled(false)
    setIsBrowserExtensionEnabled(false)
  }

  // Pairing info state
  const [pairingToken, setPairingToken] = useState('')
  const [fingerprint, setFingerprint] = useState('')
  const [tokenCreationDate, setTokenCreationDate] = useState('')
  const [loadingPairing, setLoadingPairing] = useState(false)
  const [copyFeedback, setCopyFeedback] = useState('')

  const loadPairingInfo = async (reset = false) => {
    try {
      setLoadingPairing(true)
      const client = createOrGetPearpassClient()

      let id
      if (reset) {
        // Reset pairing - generate new identity and clear sessions
        id = await resetIdentity(client)
      } else {
        // Just load existing identity
        id = await getOrCreateIdentity(client)
      }

      const code = getPairingCode(id.ed25519PublicKey)
      const fingerprint = getFingerprint(id.ed25519PublicKey)
      // Create a combined token for secure pairing
      const token = `${code}-${fingerprint.slice(0, 4).toUpperCase()}`
      setPairingToken(token)
      setFingerprint(fingerprint)
      setTokenCreationDate(id.creationDate)

      if (reset) {
        // Show feedback when new token is generated
        setCopyFeedback(i18n._('New pairing token generated!'))
        setTimeout(() => setCopyFeedback(''), COPY_FEEDBACK_DISPLAY_TIME)
      }
    } catch {
      setPairingToken('')
      setFingerprint('')
      setTokenCreationDate('')
      if (reset) {
        setCopyFeedback(i18n._('Failed to generate new token'))
        setTimeout(() => setCopyFeedback(''), COPY_FEEDBACK_DISPLAY_TIME)
      }
    } finally {
      setLoadingPairing(false)
    }
  }

  useEffect(() => {
    if (enteredExtensionId && pairingToken && !loadingPairing) {
      setModal(
        html`<${ExtensionPairingModalContent}
          onCopy=${() => copyToClipboard(pairingToken)}
          pairingToken=${pairingToken}
          loadingPairing=${loadingPairing}
          copyFeedback=${copyFeedback}
          tokenCreationDate=${tokenCreationDate}
          fingerprint=${fingerprint}
        />`,
        { replace: true }
      )
    }
  }, [enteredExtensionId, pairingToken, loadingPairing, copyFeedback, tokenCreationDate, fingerprint, copyToClipboard, setModal])

  const toggleBrowserExtension = async (isOn) => {
    if (isOn) {
      setModal(
        html`<${ConnectionStatusModalContent} 
          onSubmit=${async (extensionId) => {
            setEnteredExtensionId(extensionId)
            await handleSetupExtension(extensionId)
          }}
        />`,
        { closable: true }
      )
      return
    }

    await handleStopNativeMessaging()
  }

  useEffect(() => {
    if (isBrowserExtensionEnabled) {
      void loadPairingInfo()
    }
  }, [isBrowserExtensionEnabled])

  return {
    toggleBrowserExtension,
    isBrowserExtensionEnabled
  }
}
