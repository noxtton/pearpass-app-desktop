import { useEffect } from 'react'

import { html } from 'htm/react'

import { AppWrapper } from './styles.js'
import { useRouter } from '../../context/RouterContext.js'
import { InitialLoadPage } from '../InitialPage'
import { LayoutWithSidebar } from '../LayoutWithSidebar'
import { MainView } from '../MainView/index.js'
import { RecordDetails } from '../RecordDetails'
import { SettingsView } from '../SettingsView/index.js'
import { InitialWelcomePage } from '../WelcomePage'

export const App = () => {
  const { currentPage, data, navigate } = useRouter()

  const getMainView = () => {
    if (currentPage === 'vault') {
      return html`<${MainView} /> `
    } else if (currentPage === 'settings') {
      return html`<${SettingsView} /> `
    }
  }

  const getSideView = () => {
    if (currentPage === 'vault' && data?.recordId) {
      return html` <${RecordDetails} /> `
    }
  }

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      navigate('welcome')
    }, 3000)
  }, [])

  return html`
    <${AppWrapper}>
      ${currentPage === 'welcome' && html` <${InitialWelcomePage} /> `}
      ${currentPage === 'loading' && html` <${InitialLoadPage} /> `}
      ${['vault', 'settings'].includes(currentPage) &&
      html`
        <${LayoutWithSidebar}
          mainView=${getMainView()}
          sideView=${getSideView()}
        />
      `}
    <//>
  `
}
