import os from 'os'
import path from 'path'

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
      const executablePathExtension = os.platform() === 'win32' ? '.bat' : ''
      const executablePath = path.join(
        process.cwd(),
        'src',
        'scripts',
        `pearpass-native-host-executable${executablePathExtension}`
      )

      // Setup native messaging for the extension
      const result = await setupNativeMessaging(
        extensionId.trim(),
        executablePath
      )

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
        html` <div style=${{ marginTop: '8px' }}>${setupMessage}</div>`}
      <//>
    `}
    ${isBrowserExtensionEnabled &&
    !showSetupForm &&
    html`
      <${CardSingleSetting} title=${i18n._('Connection Status')}>
        <${Description}>
          ${i18n._(
            'Browser extension is connected and can communicate with PearPass securely.'
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
    `}
  `
}
