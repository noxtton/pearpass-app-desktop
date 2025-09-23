import { createContext, useState, useContext, useEffect } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'

import { BannerBox } from '../components/BannerBox'
import { isNativeMessagingIPCRunning } from '../services/nativeMessagingIPCServer'
import { getNativeMessagingEnabled } from '../services/nativeMessagingPreferences'

const BannerContext = createContext()

export const BannerProvider = ({ children }) => {
  const { i18n } = useLingui()

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const enabled = getNativeMessagingEnabled()
    const isRunning = isNativeMessagingIPCRunning()

    if (!enabled || !isRunning) {
      setVisible(true)
    }
  }, [])

  const showBanner = () => {
    setVisible(true)
  }

  const hideBanner = () => {
    setVisible(false)
  }

  return html`
    <${BannerContext.Provider}
      value=${{
        visible,
        showBanner,
        hideBanner
      }}
    >
      ${children}
      ${visible &&
      html`
        <${BannerBox}
          onClose=${hideBanner}
          isVisible=${visible}
          title=${i18n._('You’ve got the app. Now unlock the full experience.')}
          message=${i18n._(
            'Install our browser extension to autofill passwords, save new logins in a click, and log in instantly,right where you browse.'
          )}
          highlightedDescription=${i18n._(
            'No more copy-paste. No more interruptions. Just seamless security.'
          )}
          buttonText=${i18n._('Download now')}
        />
      `}
    <//>
  `
}

export const useBanner = () => useContext(BannerContext)
