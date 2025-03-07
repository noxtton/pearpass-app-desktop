import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useVaults } from 'pearpass-lib-vault-desktop'

import { CardSingleSetting } from '../CardSingleSetting'
import { Vault } from '../Vault'
import { content } from './styles'

export const VaultsTab = () => {
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
