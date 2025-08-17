import { html } from 'htm/react'

import { LayoutWithSidebar } from '../../containers/LayoutWithSidebar'
import { RecordDetails } from '../../containers/RecordDetails'
import { useRouter } from '../../context/RouterContext'
import { InitialPage } from '../../pages/InitialPage'
import { Intro } from '../../pages/Intro'
import { MainView } from '../../pages/MainView'
import { SettingsView } from '../../pages/SettingsView'
import { TouPage } from '../../pages/TouPage'
import { WelcomePage } from '../../pages/WelcomePage'

/**
 * @param {Object} props
 * @param {boolean} props.isLoading
 * @returns {import('react').ReactNode}
 */
export const Routes = ({ isLoading }) => {
  const { currentPage, data } = useRouter()

  if (isLoading || currentPage === 'loading') {
    return html` <${InitialPage} /> `
  }

  if (currentPage === 'termsOfUse') {
    return html` <${TouPage} /> `
  }

  if (currentPage === 'intro') {
    return html` <${Intro} /> `
  }

  if (currentPage === 'welcome') {
    return html` <${WelcomePage} /> `
  }

  if (['vault', 'settings'].includes(currentPage)) {
    return html`
      <${LayoutWithSidebar}
        mainView=${getMainView(currentPage)}
        sideView=${getSideView(currentPage, data)}
      />
    `
  }
}

const MAIN_VIEW_BY_PAGE = {
  vault: MainView,
  settings: SettingsView
}

/**
 * @param {string} currentPage
 * @returns {import('react').ReactNode}
 */
function getMainView(currentPage) {
  const Component = MAIN_VIEW_BY_PAGE[currentPage]
  return Component ? html`<${Component} />` : null
}

/**
 * @param {string} currentPage
 * @param {import('../../context/RouterContext').RouterData} data
 * @returns {import('react').ReactNode}
 */
function getSideView(currentPage, data) {
  if (currentPage === 'vault' && data?.recordId) {
    return html` <${RecordDetails} /> `
  }
}
