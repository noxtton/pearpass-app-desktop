import { html } from 'htm/react'
import { useVault } from 'pearpass-lib-vault'

import { SettingsView } from '../../containers/SettingsView'
import { useRouter } from '../../context/RouterContext.js'
import { InitialLoadPage } from '../InitialPage'
import { LayoutWithSidebar } from '../LayoutWithSidebar'
import { MainView } from '../MainView'
import { RecordDetails } from '../RecordDetails'
import { WelcomePage } from '../WelcomePage'

export const Routes = () => {
  const { currentPage, data, navigate } = useRouter()

  useVault({
    variables: {
      vaultId: '123' // currently we have only 1 vault so we can hardcode this for now
    },
    onCompleted: (payload) => {
      if (payload.id) {
        navigate('vault', {
          recordType: 'all'
        })

        return
      }

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
