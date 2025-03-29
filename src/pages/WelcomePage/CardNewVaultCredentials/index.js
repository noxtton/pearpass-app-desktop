import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useForm } from 'pear-apps-lib-ui-react-hooks'
import { Validator } from 'pear-apps-utils-validator'
import {
  ButtonPrimary,
  ButtonSecondary,
  PearPassInputField,
  PearPassPasswordField
} from 'pearpass-lib-ui-react-components'
import { useCreateVault } from 'pearpass-lib-vault'

import {
  ButtonWrapper,
  CardContainer,
  CardTitle,
  InputsContainer,
  Title
} from './styles'
import { useRouter } from '../../../context/RouterContext'

export const CardNewVaultCredentials = () => {
  const { i18n } = useLingui()
  const { navigate, currentPage } = useRouter()

  const schema = Validator.object({
    name: Validator.string().required(i18n._('Name is required')),
    password: Validator.string().required(i18n._('Password is required'))
  })

  const { createVault } = useCreateVault({
    onCompleted: () => {
      navigate('vault', { recordType: 'all' })
    }
  })

  const { register, handleSubmit } = useForm({
    initialValues: {
      name: '',
      password: ''
    },
    validate: (values) => {
      return schema.validate(values)
    }
  })

  const onSubmit = (values) => {
    createVault(values.name, values.password)
  }

  return html` <${CardContainer}>
    <${CardContainer}>
      <${CardTitle}>
        <${Title}>
          ${i18n._('Enter Name and Password for new Vault')}
        <//>
      <//>

      <${InputsContainer}>
        <${PearPassInputField} placeholder='Enter Name' ...${register('name')} />
        <${PearPassPasswordField} ...${register('password')} />
      <//>

      <${ButtonWrapper}>
        <${ButtonPrimary} size="md" onClick=${handleSubmit(onSubmit)}>
          ${i18n._('Create a new vault')}
        <//>

        <${ButtonSecondary} size="md" onClick=${() => navigate(currentPage, { state: 'vaults' })} type="button">
          ${i18n._('Go back')}
        <//>
      <//>
    <//></${CardContainer}
  >`
}
