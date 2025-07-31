import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useVaults } from 'pearpass-lib-vault'

import { Content } from './styles'
import { CardSingleSetting } from '../../../../components/CardSingleSetting'
import { ListItem } from '../../../../components/ListItem'
import { ModifyMasterVaultModalContent } from '../../../../containers/Modal/ModifyMasterVaultModalContent'
import { ModifyVaultModalContent } from '../../../../containers/Modal/ModifyVaultModalContent'
import { useModal } from '../../../../context/ModalContext'
import { vaultCreatedFormat } from '../../../../utils/vaultCreated'

export const SettingsPasswordsSection = () => {
  const { i18n } = useLingui()
  const { setModal } = useModal()
  const { data } = useVaults()

  return html`
    <${CardSingleSetting}
      title=${i18n._('Passwords')}
      description=${i18n._('Here you can modify yours passwords')}
    >
      <${Content}>
        <${ListItem}
          itemName=${i18n._('Master Vault')}
          onEditClick=${() =>
            setModal(html`<${ModifyMasterVaultModalContent} />`)}
        />
        ${data?.map(
          (vault) =>
            html`<${ListItem}
              key=${vault.name}
              itemName="${vault.name}"
              itemDateText=${vaultCreatedFormat(vault.createdAt)}
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
