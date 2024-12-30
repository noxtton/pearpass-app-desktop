import { html } from 'htm/react'
import { AppWrapper } from './styles.js'
import { LayoutWithSidebar } from '../LayoutWithSidebar'
import { useRouter } from '../../context/RouterContext.js'
import { InitialWelcomePage } from '../WelcomePage'
import { InitialLoadPage } from '../InitialPage'
import { RecordDetails } from '../RecordDetails'

export const App = () => {
  const { currentPage, data } = useRouter()

  const getMainView = () => {
    if (currentPage === 'vault') {
      return html` <div>Main View</div> `
    }
  }

  const getSideView = () => {
    if (currentPage === 'vault' && data?.recordId === '12345') {
      return html` <${RecordDetails} /> `
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
