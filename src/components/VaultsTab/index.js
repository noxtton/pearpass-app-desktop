import { useLingui } from '@lingui/react'
import { html } from 'htm/react'

import { CardSingleSetting } from '../CardSingleSetting'
import { Vault } from '../Vault'
import { content } from './styles'

const MOCK_DATA_VAULTS = [
  { name: 'Personal', createdAt: '10/12/2024' },
  { name: 'Work', createdAt: '10/12/2024' }
]

export const VaultsTab = () => {
  const { i18n } = useLingui()

  return html`
    <${CardSingleSetting} title=${i18n._('Manage Vaults')}>
      <${content}>
        ${MOCK_DATA_VAULTS.map((vault) => html`<${Vault} vault=${vault} />`)}
      <//>
    <//>
  `
}
