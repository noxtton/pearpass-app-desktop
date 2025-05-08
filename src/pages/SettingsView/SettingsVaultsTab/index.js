import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useVaults } from 'pearpass-lib-vault'

import { content } from './styles'
import { CardSingleSetting } from '../../../components/CardSingleSetting'
import { Vault } from '../../../components/Vault'

export const SettingsSettingsVaultsTab = () => {
  const { i18n } = useLingui()
  const { data } = useVaults()

  return html`
    <${CardSingleSetting} title=${i18n._('Manage Vaults')}>
      <${content}>
        ${data?.map((vault) => html`<${Vault} vault=${vault} />`)}
      <//>
    <//>
  `
}
