import { useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { ArrowLeftIcon, ButtonLittle } from 'pearpass-lib-ui-react-components'

import { ExportTab } from './ExportTab'
import { ImportTab } from './ImportTab'
import { SettingsTab } from './SettingsTab'
import { SettingsVaultsTab } from './SettingsVaultsTab'
import { ContentContainer, NavBar, Tabs, TabTitle, Wrapper } from './styles'
import { useRouter } from '../../context/RouterContext'

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
        <${ButtonLittle}
          onClick=${handleGoBack}
          variant="secondary"
          startIcon=${ArrowLeftIcon}
        />

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
        <//>
        ${activeTab === 'general'
          ? html`<${SettingsTab} />`
          : activeTab === 'vaults'
            ? html`<${SettingsVaultsTab} />`
            : activeTab === 'import'
              ? html`<${ImportTab} />`
              : activeTab === 'export'
                ? html`<${ExportTab} />`
                : null}
      <//>
    <//>
  `
}
