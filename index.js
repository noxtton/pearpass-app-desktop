import { createRoot } from 'react-dom/client'

import { App } from './src/containers/App'
import { html } from 'htm/react'
import { applyGlobalStyles } from './src/utils/applyGlobalStyles'
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { messages } from './src/locales/en/messages.mjs'
import { ModalProvider } from './src/context/ModalContext'
import { RouterProvider } from './src/context/RouterContext'

Pear.updates(() => Pear.reload())

const root = createRoot(document.querySelector('#root'))

// Reset CSS
applyGlobalStyles(`
    @font-face {
    font-family: 'Humble Nostalgia';
    src: url('src/assets/fonts/HumbleNostalgia.otf') format('OpenType');
    font-weight: normal;
    font-style: normal;
    }
    @font-face {
    font-family: 'Inter';
    src: url('src/assets/fonts/Inter.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    }
    
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    
    * {
        box-sizing: border-box;
     }
    html {
    height: 100%;
    display: flex;
    padding-top: 42px;
    }
    body {
        --title-bar-height: 42px;
        line-height: 1;
        flex:1
    }
    #root {
        height: 100%
    }
    #bar {
        backdrop-filter: blur(64px);
        -webkit-app-region: drag;
        height: var(--title-bar-height);
        padding: 0;
        color: #fff;
        white-space: nowrap;
        position: fixed;
        z-index: 10000;
        width: 100%;
        left: 0;
        top: 0;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
`)

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
