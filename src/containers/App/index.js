import { html } from 'htm/react'
import { AppWrapper } from './styles.js'
import { LayoutWithSidebar } from '../LayoutWithSidebar'
import { useRouter } from '../../context/RouterContext.js'
import { InitialWelcomePage } from '../WelcomePage/index.js'
import { InitialLoadPage } from '../InitialPage/index.js'
import { VaultDetails } from '../VaultDetails/index.js'

export const App = () => {
  const { currentPage, data } = useRouter()

  const getMainView = () => {
    if (currentPage === 'vault') {
      return html` <div>Main View</div> `
    }
  }

  const getSideView = () => {
    if (currentPage === 'vault' && data?.vaultId === '12345') {
      return html` <${VaultDetails} /> `
    }
  }

  return html`
    <${AppWrapper}>
      ${currentPage === 'welcome' && html` <${InitialWelcomePage} /> `}
      ${currentPage === 'loading' && html` <${InitialLoadPage} /> `}
      ${currentPage.startsWith('vault') &&
      html`
        <${LayoutWithSidebar}
          mainView=${getMainView()}
          sideView=${getSideView()}
        />
      `}
    <//>
  `
}
