import React from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useVaults } from 'pearpass-lib-vault'

import { content, Description } from './styles'
import { CardSingleSetting } from '../../../components/CardSingleSetting'
import { Vault } from '../../../components/Vault'
import { ModifyMasterVaultModalContent } from '../../../containers/Modal/ModifyMasterVaultModalContent'
import { ModifyVaultModalContent } from '../../../containers/Modal/ModifyVaultModalContent'
import { useModal } from '../../../context/ModalContext'

export const SettingsVaultsTab = () => {
  const { i18n } = useLingui()
  const { data } = useVaults()
  const { setModal } = useModal()

  return html`
    <${CardSingleSetting} title=${i18n._('Master Vault')}>
      <${content}>
        <${Description}
          >${i18n._('Here you can modify the your Master password')}<//
        >
        <${Vault}
          vault=${{
            name: i18n._('Master Vault')
          }}
          onEditClick=${() =>
            setModal(html`<${ModifyMasterVaultModalContent} />`)}
        />
      <//>
    <//>
    <${CardSingleSetting} title=${i18n._('Manage Vaults')}>
      <${content}>
        ${data?.map(
          (vault) =>
            html`<${Vault}
              key=${vault.name}
              vault=${vault}
              onEditClick=${() =>
                setModal(
                  html`<${ModifyVaultModalContent}
                    vaultId=${vault.id}
                    vaultName=${vault.name}
                  />`
                )}
            />`
        )}
      <//>
    <//>
  `
}
