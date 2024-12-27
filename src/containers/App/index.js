import { html } from 'htm/react'
import { AppWrapper } from './styles.js'
import { LayoutWithSidebar } from '../LayoutWithSidebar/index.js'

export const App = () => {
  return html`
    <${AppWrapper}>
      <${LayoutWithSidebar} />
    <//>
  `
}

//  ${currentPage === 'welcome' && html` <${InitialWelcomePage} /> `}
//  ${currentPage === 'loading' && html` <${InitialLoadPage} /> `}
