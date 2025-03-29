import { useMemo } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useForm } from 'pear-apps-lib-ui-react-hooks'
import { Validator } from 'pear-apps-utils-validator'
import {
  ButtonPrimary,
  ButtonSecondary,
  PearPassPasswordField
} from 'pearpass-lib-ui-react-components'
import { useVault, useVaults } from 'pearpass-lib-vault'

import { ButtonWrapper, CardContainer, CardTitle, Title } from './styles'
import { useRouter } from '../../../context/RouterContext'

export const CardUnlockVault = () => {
  const { i18n } = useLingui()

  const { navigate, currentPage, data: routerData } = useRouter()

  const { refetch } = useVault({ shouldSkip: true })
  const { data: vaults } = useVaults()

  const vault = useMemo(
    () => vaults.find((vault) => vault.id === routerData.vaultId),
    [vaults, routerData]
  )

  const schema = Validator.object({
    password: Validator.string().required(i18n._('Password is required'))
  })

  const { register, handleSubmit } = useForm({
    initialValues: { password: '' },
    validate: (values) => {
      return schema.validate(values)
    }
  })

  const onSubmit = async () => {
    await refetch(routerData.vaultId)

    navigate('vault', { recordType: 'all' })
  }

  return html`
    <${CardContainer} onSubmit=${handleSubmit(onSubmit)}>
      <${CardTitle}>
        <${Title}>
          ${i18n._('Unlock {vaultName} with your vault password', {
            vaultName: vault.name ?? vault.id
          })}
        <//>
      <//>

      <${PearPassPasswordField} ...${register('password')} />

      <${ButtonWrapper}>
        <${ButtonPrimary} type="submit"> ${i18n._('Continue')} <//>

        <${ButtonSecondary}
          onClick=${() => navigate(currentPage, { state: 'vaults' })}
        >
          ${i18n._('Select vaults')}
        <//>
      <//>
    <//>
  `
}
