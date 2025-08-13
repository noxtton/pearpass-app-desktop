import { useEffect, useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  Switch,
  InputField,
  ButtonSecondary
} from 'pearpass-lib-ui-react-components'

import { InputWrapper, SwitchList, SwitchWrapper } from './styles'
import { ButtonWrapper } from './styles.js'
import { CardSingleSetting } from '../../../components/CardSingleSetting'
import { createOrGetPearpassClient } from '../../../services/createOrGetPearpassClient'
import {
  isNativeMessagingIPCRunning,
  startNativeMessagingIPC,
  stopNativeMessagingIPC
} from '../../../services/nativeMessagingIPCServer.js'
import {
  getNativeMessagingEnabled,
  setNativeMessagingEnabled
} from '../../../services/nativeMessagingPreferences.js'
import { setupNativeMessaging } from '../../../utils/nativeMessagingSetup'
import { Description } from '../ExportTab/styles'
import { getOrCreateIdentity, getPairingCode, getFingerprint } from '../../../services/security/appIdentity.js'
import {
  ListItemContainer, ListItemDate,
  ListItemDescription,
  ListItemInfo,
  ListItemName
} from "../../../components/ListItem/styles.js";
import { COPY_FEEDBACK_DISPLAY_TIME } from "../../../constants/timeConstants.js";

export const SettingsPrivacyTab = () => {
  const { i18n } = useLingui()
  const [isBrowserExtensionEnabled, setIsBrowserExtensionEnabled] =
    useState(false)
  const [extensionId, setExtensionId] = useState('')
  const [isSettingUp, setIsSettingUp] = useState(false)
  const [setupMessage, setSetupMessage] = useState('')
  const [showSetupForm, setShowSetupForm] = useState(false)

  const handleSetupExtension = async () => {
    if (!extensionId.trim()) {
      setSetupMessage(i18n._('Please enter the extension ID'))
      return
    }

    setIsSettingUp(true)
    setSetupMessage('')

    try {
      // Setup native messaging for the extension
      const result = await setupNativeMessaging(extensionId.trim())

      if (result.success) {
        // Start native messaging IPC server
        const client = createOrGetPearpassClient()
        await startNativeMessagingIPC(client)
        setNativeMessagingEnabled(true)
        setIsBrowserExtensionEnabled(true)
        setShowSetupForm(false)
        setSetupMessage(i18n._('Extension connected successfully!'))
      } else {
        setSetupMessage(result.message || i18n._('Setup failed'))
      }
    } catch (error) {
      setSetupMessage(i18n._('Error: ') + error.message)
    } finally {
      setIsSettingUp(false)
    }
  }

  const handleStopNativeMessaging = async () => {
    await stopNativeMessagingIPC()
    setNativeMessagingEnabled(false)
    setIsBrowserExtensionEnabled(false)
  }

  const toggleBrowserExtension = async (isOn) => {
    if (isOn) {
      setShowSetupForm(true)
      return
    }

    await handleStopNativeMessaging()
    setShowSetupForm(false)
    setExtensionId('')
    setSetupMessage('')
  }

  useEffect(() => {
    const enabled = getNativeMessagingEnabled()
    const isRunning = isNativeMessagingIPCRunning()

    if (enabled && isRunning) {
      setIsBrowserExtensionEnabled(true)
    }
  }, [])

  // Pairing info state
  const [pairingToken, setPairingToken] = useState('')
  const [fingerprint, setFingerprint] = useState('')
  const [tokenCreationDate, setTokenCreationDate] = useState('')
  const [loadingPairing, setLoadingPairing] = useState(false)
  const [copyFeedback, setCopyFeedback] = useState('')

  const loadPairingInfo = async () => {
    try {
      setLoadingPairing(true)
      const client = createOrGetPearpassClient()
      const id = await getOrCreateIdentity(client)
      const code = getPairingCode(id.ed25519PublicKey)
      const fingerprint = getFingerprint(id.ed25519PublicKey)
      // Create a combined token for secure pairing
      const token = `${code}-${fingerprint.slice(0, 4).toUpperCase()}`
      setPairingToken(token)
      setFingerprint(fingerprint)
      setTokenCreationDate(id.creationDate)
    } catch {
      setPairingToken('')
      setFingerprint('')
      setTokenCreationDate('')
    } finally {
      setLoadingPairing(false)
    }
  }

  const copyTokenToClipboard = async () => {
    if (!pairingToken || loadingPairing) return
    
    try {
      await navigator.clipboard.writeText(pairingToken)
      setCopyFeedback(i18n._('Copied!'))
      setTimeout(() => setCopyFeedback(''), COPY_FEEDBACK_DISPLAY_TIME)
    } catch (err) {
      setCopyFeedback(i18n._('Failed to copy'))
      setTimeout(() => setCopyFeedback(''), COPY_FEEDBACK_DISPLAY_TIME)
    }
  }

  const formatCreationDate = (isoDate) => {
    if (!isoDate) return ''
    try {
      const date = new Date(isoDate)
      return i18n._(`Created on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`)
    } catch {
      return ''
    }
  }

  useEffect(() => {
    if (isBrowserExtensionEnabled && !showSetupForm) {
      void loadPairingInfo()
    }
  }, [isBrowserExtensionEnabled, showSetupForm])

  return html`
    <${CardSingleSetting} title=${i18n._('Browser Extension')}>
      <${Description}>
        ${i18n._(
          'Connect your browser extension to enable secure communication with PearPass.'
        )}
      <//>

      <${SwitchList}>
        <${SwitchWrapper}>
          <${Switch}
            isOn=${isBrowserExtensionEnabled}
            onChange=${(isOn) => toggleBrowserExtension(isOn)}
          ><//>
          ${i18n._('Enable Browser Extension Integration')}
        <//>
      <//>
    <//>

    ${showSetupForm &&
    html`
      <${CardSingleSetting} title=${i18n._('Connect Browser Extension')}>
        <${Description}>
          ${i18n._(
            'Enter the extension ID - You can find it in extension settings'
          )}
        <//>
        <${InputWrapper}>
          <${InputField}
            placeholder=${i18n._('Extension ID...')}
            value=${extensionId}
            onChange=${(e) => setExtensionId(e)}
            disabled=${isSettingUp}
          />
        <//>

        <div>
          <${ButtonWrapper}>
            <${ButtonSecondary}
              onClick=${handleSetupExtension}
              disabled=${isSettingUp || !extensionId.trim()}
            >
              ${isSettingUp
                ? i18n._('Setting up...')
                : i18n._('Connect Extension')}
            <//>
          <//>
        </div>

        ${setupMessage &&
        html`<${Description} style=${{ display: 'block', marginTop: '8px' }}
          >${setupMessage}<//
        >`}
      <//>
    `}
    ${isBrowserExtensionEnabled &&
    !showSetupForm &&
    html`
      <${CardSingleSetting} title=${i18n._('Connection Status')}>
        <${Description}>
          ${i18n._(
            'Browser extension is connected and can communicate with PearPass.'
          )}
        <//>
        <div>
          <${ButtonWrapper}>
            <${ButtonSecondary}
              onClick=${() => {
                setShowSetupForm(true)
                setSetupMessage('')
              }}
            >
              ${i18n._('Connect Different Extension')}
            <//>
          <//>
        </div>
      <//>

      <${CardSingleSetting} title=${i18n._('Extension Pairing')}>
        <${Description}>
          ${i18n._('Click below to copy the pairing token to your clipboard, then paste it in your browser extension to establish secure communication.')}
        <//>
        <${ListItemContainer} 
          onClick=${copyTokenToClipboard}
          style=${{ 
            cursor: pairingToken && !loadingPairing ? 'pointer' : 'default',
            transition: 'background-color 0.2s',
            borderRadius: '8px',
            marginTop: '16px'
          }}
          onMouseEnter=${(e) => {
            if (pairingToken && !loadingPairing) {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)'
            }
          }}
          onMouseLeave=${(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
        >
          <${ListItemInfo}>
            <${ListItemDescription}>
              <${ListItemName} style=${{ fontFamily: 'monospace', fontSize: '16px', fontWeight: 'bold' }}>${
                      loadingPairing ? i18n._('Loading...') : pairingToken || i18n._('Unavailable')
              }<//>
              <${ListItemDate}>${
                copyFeedback || formatCreationDate(tokenCreationDate)
              }<//>
            <//>
          <//>
        <//>
        <${Description} style=${{ display: 'block', marginTop: '16px', fontSize: '12px', color: '#666' }}>
          ${i18n._('⚠️ Security Note: Only enter this token in the official PearPass browser extension. Never share it with anyone or enter it on websites.')}
        <//>
        <${Description} style=${{ display: 'block', marginTop: '8px', fontSize: '12px', color: '#666' }}>
          ${i18n._('Fingerprint (for verification): ')}${
            loadingPairing ? '' : fingerprint ? fingerprint.slice(0, 16) + '...' : ''
          }
        <//>
        <div>
          <${ButtonWrapper}>
            <${ButtonSecondary} onClick=${() => void loadPairingInfo()}>
              ${i18n._('Generate New Pairing Token')}
            <//>
          <//>
        </div>
      <//>
    `}
  `
}
