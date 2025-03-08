import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useForm } from 'pear-apps-lib-ui-react-hooks'
import { Validator } from 'pear-apps-utils-validator'
import {
  ButtonPrimary,
  ButtonSecondary,
  PearPassPasswordField
} from 'pearpass-lib-ui-react-components'
import { useVault } from 'pearpass-lib-vault-desktop'

import { ButtonWrapper, CardContainer, CardTitle, Title } from './styles'
import { useRouter } from '../../context/RouterContext'

const MOCK_VAULT_NAME = 'Personal'

export const CardUnlockVault = () => {
  const { i18n } = useLingui()

  const { navigate, data: routerData } = useRouter()

  const { refetch } = useVault({ shouldSkip: true })

  const schema = Validator.object({
    password: Validator.string().required(i18n._('Password is required'))
  })

  const { register, handleSubmit } = useForm({
    initialValues: { password: '' },
    validate: (values) => {
      return schema.validate(values)
    }
  })

  const handleContinue = () => {
    navigate('vault', { recordType: 'all' })
  }

  const onSubmit = async () => {
    await refetch(routerData.vaultId)

    handleContinue()
  }

  return html`
    <${CardContainer}>
      <${CardTitle}>
        <${Title}>
          ${i18n._('Unlock {vaultName} with your vault password', {
            vaultName: MOCK_VAULT_NAME
          })}
        <//>
      <//>

      <${PearPassPasswordField} ...${register('password')} />

      <${ButtonWrapper}>
        <${ButtonPrimary} onClick=${handleSubmit(onSubmit)}>
          ${i18n._('Continue')}
        <//>
        <${ButtonSecondary}> ${i18n._('Select vaults')} <//>
      <//>
    <//>
  `
}
