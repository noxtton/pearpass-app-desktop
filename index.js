import { createRoot } from 'react-dom/client'

import { App } from './src/containers/App'
import { html } from 'htm/react'

Pear.updates(() => Pear.reload())

const root = createRoot(document.querySelector('#root'))

root.render(html`<${App} />`)
