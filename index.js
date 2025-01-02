import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { html } from 'htm/react'
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider'
import { createRoot } from 'react-dom/client'

import { App } from './src/containers/App'
import { ModalProvider } from './src/context/ModalContext'
import { RouterProvider } from './src/context/RouterContext'
import { messages } from './src/locales/en/messages.mjs'
import { setFontsAndResetCSS } from './styles'

Pear.updates(() => Pear.reload())

const root = createRoot(document.querySelector('#root'))

setFontsAndResetCSS()

i18n.load('en', messages)
i18n.activate('en')

root.render(html`
    <${I18nProvider} i18n=${i18n}>
        <${RouterProvider}>
            <${ThemeProvider}>
                <${ModalProvider}>
                    <${App} />
                </${ModalProvider}>
            </${ThemeProvider}>
        </${RouterProvider}>    
    </${I18nProvider}>
`)
