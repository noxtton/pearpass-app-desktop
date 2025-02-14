import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useForm } from 'pearpass-lib-form'
import {
  ButtonPrimary,
  ButtonSecondary,
  PearPassPasswordField
} from 'pearpass-lib-ui-react-components'
import { Validator } from 'pearpass-lib-validator'

import { ButtonWrapper, CardContainer, CardTitle, Title } from './styles'
import { useRouter } from '../../context/RouterContext'

const MOCK_VAULT_NAME = 'Personal'

export const CardUnlockVault = () => {
  const { i18n } = useLingui()

  const { navigate } = useRouter()

  const schema = Validator.object({
    password: Validator.string().required(i18n._('Password is required'))
  })

  const { register, handleSubmit } = useForm({
    initialValues: { password: '' },
    validate: (values) => {
      return schema.validate(values)
    }
  })

  const handleContinue = (data) => {
    console.log(data)
    navigate('vault', { recordType: 'all' })
  }

  const onSubmit = (values) => {
    const data = { password: values.password }

    handleContinue(data)
  }

  return html`
    <${CardContainer}>
      <${CardTitle}>
        <${Title}>
          ${i18n._('Unlock {vaultName} with your vault password', {
            vaultName: MOCK_VAULT_NAME
          })}<//
        >
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
