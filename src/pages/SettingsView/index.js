import { useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { ArrowLeftIcon, ButtonLittle } from 'pearpass-lib-ui-react-components'

import { SettingsTab } from './SettingsTab'
import { ContentContainer, NavBar, Tabs, TabTitle, Wrapper } from './styles'
import { VaultsTab } from '../../components/VaultsTab'
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
        <//>
        ${activeTab === 'general'
          ? html`<${SettingsTab} />`
          : html`<${VaultsTab} />`}
      <//>
    <//>
  `
}
