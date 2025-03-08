import { html } from 'htm/react'
import { useVaults } from 'pearpass-lib-vault-desktop'

import { SettingsView } from '../../containers/SettingsView'
import { useRouter } from '../../context/RouterContext.js'
import { useSimulatedLoading } from '../../hooks/useSimulatedLoading.js'
import { InitialLoadPage } from '../InitialPage'
import { LayoutWithSidebar } from '../LayoutWithSidebar'
import { MainView } from '../MainView'
import { RecordDetails } from '../RecordDetails'
import { WelcomePage } from '../WelcomePage'

export const Routes = () => {
  const { currentPage, data, navigate } = useRouter()
  const loading = useSimulatedLoading()

  useVaults({
    onCompleted: (payload) => {
      if (payload?.length) {
        navigate('welcome', { state: 'masterPassword' })
        return
      }

      navigate('welcome', { state: 'fresh' })
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

  if (loading || currentPage === 'loading') {
    return html` <${InitialLoadPage} /> `
  }

  if (currentPage === 'welcome') {
    return html` <${WelcomePage} /> `
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
