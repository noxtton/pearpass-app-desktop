import { html } from 'htm/react'

import { SettingsView } from '../../containers/SettingsView'
import { useRouter } from '../../context/RouterContext.js'
import { useVault } from '../../vault/hooks/useVault.js'
import { InitialLoadPage } from '../InitialPage'
import { LayoutWithSidebar } from '../LayoutWithSidebar'
import { MainView } from '../MainView'
import { RecordDetails } from '../RecordDetails'
import { InitialWelcomePage } from '../WelcomePage'

export const Routes = () => {
  const { currentPage, data, navigate } = useRouter()

  useVault({
    onCompleted: () => {
      navigate('welcome')
    }
  })

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

  if (currentPage === 'loading') {
    return html` <${InitialLoadPage} /> `
  }

  if (currentPage === 'welcome') {
    return html` <${InitialWelcomePage} /> `
  }

  if (['vault', 'settings'].includes(currentPage)) {
    return html`
      <${LayoutWithSidebar}
        mainView=${getMainView()}
        sideView=${getSideView()}
      />
    `
  }
}
