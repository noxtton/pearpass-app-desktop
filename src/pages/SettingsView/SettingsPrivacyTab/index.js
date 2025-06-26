import { useEffect, useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { CopyIcon, Switch } from 'pearpass-lib-ui-react-components'

import {
  InfoCard,
  InfoCardText,
  InfoCardTitle,
  SwitchList,
  SwitchWrapper,
  Title
} from './styles'
import {
  autopassServerInstance,
  getLocalstoragePort,
  removeLocalstoragePort,
  setLocalstoragePort,
  startServer,
  stopServer
} from '../../../autopassServer'
import { CardSingleSetting } from '../../../components/CardSingleSetting'
import { useToast } from '../../../context/ToastContext'
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard'

export const SettingsPrivacyTab = () => {
  const { i18n } = useLingui()

  const [fullToken, setFullToken] = useState(null)

  const { setToast } = useToast()

  const [isBrowserExtensionEnabled, setIsBrowserExtensionEnabled] =
    useState(false)

  const { copyToClipboard } = useCopyToClipboard({
    onCopy: () => {
      setToast({
        message: i18n._('Copied to clipboard'),
        icon: CopyIcon
      })
    }
  })

  const handleStartServer = async () => {
    const autopassServerInstance = await startServer()

    const port = autopassServerInstance?.getPort()
    const accessToken = await autopassServerInstance?.getAccessToken()

    if (!port || !accessToken) {
      return
    }

    setLocalstoragePort(port)
    setFullToken(`${port}/${accessToken}`)
    setIsBrowserExtensionEnabled(true)
  }

  const handleStopServer = async () => {
    await stopServer()
    removeLocalstoragePort()
    setIsBrowserExtensionEnabled(false)
    setFullToken(null)
  }

  const toggleBrowserExtension = async (isOn) => {
    if (isOn) {
      return await handleStartServer()
    }

    await handleStopServer()
  }

  useEffect(() => {
    ;(async () => {
      const port = getLocalstoragePort()
      const accessToken = await autopassServerInstance?.getAccessToken()

      if (!port || !accessToken || !autopassServerInstance?.isListening()) {
        return
      }

      setFullToken(`${port}/${accessToken}`)
      setIsBrowserExtensionEnabled(true)
    })()
  }, [])

  return html`
    <${CardSingleSetting} title=${i18n._('Personalization')}>
      <${Title}>
        ${i18n._(
          'Here you can choose your privacy settings and personalize your experience.'
        )}
      <//>

      <${SwitchList}>
        <${SwitchWrapper}>
          <${Switch}
            isOn=${isBrowserExtensionEnabled}
            onChange=${(isOn) => toggleBrowserExtension(isOn)}
          ><//>

          ${i18n._('Active Browser extension')}
        <//>

        ${!!fullToken &&
        html`
          <${InfoCard}>
            <${InfoCardTitle}>
              ${i18n._('Open browser and copy token link')}
            <//>

            <${InfoCardText} onClick=${() => copyToClipboard(fullToken)}>
              ${fullToken}
            <//>
          <//>
        `}
      <//>
    <//>
  `
}
