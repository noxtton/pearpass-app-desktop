import { html } from 'htm/react'

import { AppWrapper } from './styles.js'
import { useRouter } from '../../context/RouterContext.js'
import { EmptyCollectionView } from '../EmptyCollectionView/index.js'
import { InitialLoadPage } from '../InitialPage'
import { LayoutWithSidebar } from '../LayoutWithSidebar'
import { RecordDetails } from '../RecordDetails'
import { InitialWelcomePage } from '../WelcomePage'

export const App = () => {
  const { currentPage, data } = useRouter()

  const getMainView = () => {
    if (currentPage === 'vault') {
      return html`<${EmptyCollectionView} /> `
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
