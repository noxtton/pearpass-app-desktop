import { html } from 'htm/react'
import { AppWrapper } from './styles.js'
import { useRouter } from '../../context/RouterContext.js'
import { InitialWelcomePage } from '../WelcomePage/index.js'
import { InitialLoadPage } from '../InitialPage/index.js'
import { Sidebar } from '../Sidebar/index.js'

export const App = () => {
  const { currentPage } = useRouter()

  return html`
    <${AppWrapper}>
      ${currentPage === 'welcome' &&
      html`
        <${InitialWelcomePage} />
      `}
      ${currentPage === 'loading' &&
      html`
        <${InitialLoadPage} />
      `}

      <${Sidebar} />
    <//>
  `
}
