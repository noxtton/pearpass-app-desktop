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
    password: Validator.string(),
    passwordConfirm: Validator.string()
  })

  const { createVault } = useCreateVault({
    onCompleted: () => {
      navigate('vault', { recordType: 'all' })
    }
  })

  const { register, handleSubmit, setErrors } = useForm({
    initialValues: {
      name: ''
    },
    validate: (values) => schema.validate(values)
  })

  const onSubmit = (values) => {
    if (values.password !== values.passwordConfirm) {
      setErrors({
        passwordConfirm: i18n._('Passwords do not match')
      })

      return
    }

    createVault({ name: values.name, password: values.password })
  }

  return html`
    <${CardContainer}>
      <${CardContainer}>
        <${CardTitle}>
          <${Title}> ${i18n._('Enter Name and Password for new Vault')} <//>
        <//>

        <${InputsContainer}>
          <${PearPassInputField}
            placeholder=${i18n._('Enter Name')}
            ...${register('name')}
          />

          <${PearPassPasswordField}
            placeholder=${i18n._('Enter Password')}
            ...${register('password')}
          />

          <${PearPassPasswordField}
            placeholder=${i18n._('Confirm Password')}
            ...${register('passwordConfirm')}
          />
        <//>

        <${ButtonWrapper}>
          <${ButtonPrimary} size="md" onClick=${handleSubmit(onSubmit)}>
            ${i18n._('Create a new vault')}
          <//>

          <${ButtonSecondary}
            size="md"
            onClick=${() => navigate(currentPage, { state: 'vaults' })}
            type="button"
          >
            ${i18n._('Go back')}
          <//>
        <//>
      <//>
    <//>
  `
}
