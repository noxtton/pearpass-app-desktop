import { useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'

import { ExportTab } from './ExportTab'
import { ImportTab } from './ImportTab'
import { SettingsPrivacyTab } from './SettingsPrivacyTab'
import { SettingsTab } from './SettingsTab'
import { SettingsVaultsTab } from './SettingsVaultsTab'
import {
  ContentContainer,
  Link,
  NavBar,
  TabContainer,
  TabFooter,
  Tabs,
  TabTitle,
  Wrapper
} from './styles'
import { useRouter } from '../../context/RouterContext'
import { BackIcon, ButtonRoundIcon } from '../../lib-react-components'

export const SettingsView = () => {
  const { i18n } = useLingui()
  const { navigate } = useRouter()

  const handleGoBack = () => {
    navigate('vault', { recordType: 'all' })
  }

  const [activeTab, setActiveTab] = useState('general')

  const handleActiveTabChange = (tab) => {
    setActiveTab(tab)
  }

  return html`
    <${Wrapper}>
      <${NavBar}>
        <${ButtonRoundIcon} onClick=${handleGoBack} startIcon=${BackIcon} />

        ${i18n._('Settings')}
      <//>

      <${ContentContainer}>
        <${Tabs}>
          <${TabTitle}
            onClick=${() => handleActiveTabChange('general')}
            isActive=${activeTab === 'general'}
          >
            ${i18n._('General')}
          <//>

          <${TabTitle}
            onClick=${() => handleActiveTabChange('vaults')}
            isActive=${activeTab === 'vaults'}
          >
            ${i18n._('Vaults')}
          <//>

          <${TabTitle}
            onClick=${() => handleActiveTabChange('import')}
            isActive=${activeTab === 'import'}
          >
            ${i18n._('Import')}
          <//>

          <${TabTitle}
            onClick=${() => handleActiveTabChange('export')}
            isActive=${activeTab === 'export'}
          >
            ${i18n._('Export')}
          <//>

          <${TabTitle}
            onClick=${() => handleActiveTabChange('privacy')}
            isActive=${activeTab === 'privacy'}
          >
            ${i18n._('Privacy')}
          <//>
        <//>

        <${TabContainer}>
          ${renderActiveTab(activeTab)}
          <${TabFooter}>
            <${Link} href="https://pass.pears.com/application-terms-of-use/">
              ${i18n._('Terms of Use')}
            <//>
            <${Link} href="https://pass.pears.com/application-privacy/">
              ${i18n._('Privacy Statement')}
            <//>
          <//>
        <//>
      <//>
    <//>
  `
}

/**
 * @param {string} activeTab
 */
const renderActiveTab = (activeTab) => {
  switch (activeTab) {
    case 'general':
      return html`<${SettingsTab} />`
    case 'vaults':
      return html`<${SettingsVaultsTab} />`
    case 'import':
      return html`<${ImportTab} />`
    case 'export':
      return html`<${ExportTab} />`
    case 'privacy':
      return html`<${SettingsPrivacyTab} />`
    default:
      return null
  }
}
