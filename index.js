import { createElement } from 'react'

import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import htm from 'htm'
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider'
import {
  closeAllInstances,
  setPearpassVaultClient,
  VaultProvider
} from 'pearpass-lib-vault'
import { startServer, vaultClientSingleton } from 'pearpass-lib-vault-desktop'
import { createRoot } from 'react-dom/client'

import { App } from './src/app/App'
import { LoadingProvider } from './src/context/LoadingContext'
import { ModalProvider } from './src/context/ModalContext'
import { RouterProvider } from './src/context/RouterContext'
import { ToastProvider } from './src/context/ToastContext'
import { messages } from './src/locales/en/messages.mjs'
import { setFontsAndResetCSS } from './styles'

Pear.updates(async () => {
  await closeAllInstances()

  Pear.reload()
})

const root = createRoot(document.querySelector('#root'))

setFontsAndResetCSS()

i18n.load('en', messages)
i18n.activate('en')

const storage = Pear.config.storage
const client = vaultClientSingleton(storage, { debugMode: true })

setPearpassVaultClient(client)
startServer(storage, { debugMode: true, port: 12345 })

const html = htm.bind(createElement)

root.render(html`
  <${LoadingProvider}>
    <${ThemeProvider}>
      <${VaultProvider}>
        <${I18nProvider} i18n=${i18n}>
          <${ToastProvider}>
            <${RouterProvider}>
              <${ModalProvider}>
                <${App} />
              <//>
            <//>
          <//>
        <//>
      <//>
    <//>
  <//>
`)
