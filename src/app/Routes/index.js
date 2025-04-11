import { html } from 'htm/react'
import { useUserData } from 'pearpass-lib-vault'

import { InitialLoadPage } from '../../containers/InitialPage'
import { LayoutWithSidebar } from '../../containers/LayoutWithSidebar'
import { RecordDetails } from '../../containers/RecordDetails'
import { useRouter } from '../../context/RouterContext.js'
import { useSimulatedLoading } from '../../hooks/useSimulatedLoading.js'
import { MainView } from '../../pages/MainView'
import { SettingsView } from '../../pages/SettingsView'
import { WelcomePage } from '../../pages/WelcomePage'

export const Routes = () => {
  const { currentPage, data, navigate } = useRouter()
  const isSimulatedLoading = useSimulatedLoading()

  const { isLoading: isUserDataLoading } = useUserData({
    onCompleted: (payload) => {
      navigate('welcome', {
        state: payload?.hasPasswordSet
          ? 'masterPassword'
          : 'createMasterPassword'
      })
    }
  })

  const isLoading = isUserDataLoading || isSimulatedLoading

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

  if (isLoading || currentPage === 'loading') {
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
