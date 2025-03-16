import { useMemo, useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useForm } from 'pear-apps-lib-ui-react-hooks'
import { Validator } from 'pear-apps-utils-validator'
import {
  ButtonPrimary,
  PearPassPasswordField
} from 'pearpass-lib-ui-react-components'
import { useVault, useVaults } from 'pearpass-lib-vault'

import { useModal } from '../../../context/ModalContext'
import { ModalContent } from '../ModalContent'
import {
  VaultsContainer,
  Description,
  Header,
  Title,
  UnlockVaultContainer
} from './styles'
import { FormModalHeaderWrapper } from '../../../components/FormModalHeaderWrapper'
import { Vault } from '../../../components/Vault'

export const SwapVaultModalContent = () => {
  const { i18n } = useLingui()
  const { closeModal } = useModal()

  const schema = Validator.object({
    password: Validator.string().required(i18n._('Password is required'))
  })

  const { register, handleSubmit } = useForm({
    initialValues: {
      password: ''
    },
    validate: (values) => {
      return schema.validate(values)
    }
  })

  const { data: vaultsData } = useVaults()

  const {
    data: vaultData,
    refetch,
    isVaultProtected
  } = useVault({ shouldSkip: true })

  const vaults = useMemo(() => {
    return vaultsData.filter((vault) => vault.id !== vaultData?.id)
  }, [vaultsData])

  const [vault, setVault] = useState('')

  const submit = async () => {
    await refetch(vault)

    closeModal()
  }

  const onVaultSelect = async (vaultId) => {
    const isProtected = await isVaultProtected(vaultId)

    if (isProtected) {
      setVault(vaultId)

      return
    }

    await refetch(vaultId)

    closeModal()
  }

  const titles = useMemo(() => {
    if (vault?.length) {
      return {
        title: i18n._('Insert Vault’s password'),
        description: i18n._('Unlock with the {vaultName} Vault password', {
          vaultName: vault
        })
      }
    }

    return {
      title: i18n._('Swap Vault'),
      description: i18n._('Select the Vault you want to sign in')
    }
  }, [vault])

  return html` <${ModalContent}
    onClose=${closeModal}
    headerChildren=${html`
      <${FormModalHeaderWrapper}>
        <${Header}>
          <${Title}> ${titles.title} <//>
          <${Description}> ${titles.description}<//>
        <//>
      <//>
    `}
  >
    ${vault?.length
      ? html`
          <${UnlockVaultContainer}>
            <${PearPassPasswordField} ...${register('password')} />

            <${ButtonPrimary} onClick=${handleSubmit(submit)}> ${i18n._('Submit')} </>
          <//>
        `
      : html` <${VaultsContainer}>
          ${vaults?.map(
            (vault) =>
              html`<${Vault}
                vault=${vault}
                onClick=${() => onVaultSelect(vault.id)}
              />`
          )}
        <//>`}
  <//>`
}
