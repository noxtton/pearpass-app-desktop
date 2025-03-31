import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useForm } from 'pear-apps-lib-ui-react-hooks'
import { Validator } from 'pear-apps-utils-validator'
import {
  ButtonPrimary,
  PearPassPasswordField
} from 'pearpass-lib-ui-react-components'
import { useUserData, useVaults } from 'pearpass-lib-vault'

import {
  ButtonWrapper,
  CardContainer,
  CardTitle,
  Description,
  Title
} from './styles'
import { useRouter } from '../../../context/RouterContext'

export const CardCreateMasterPassword = () => {
  const { i18n } = useLingui()
  const { currentPage, navigate } = useRouter()

  const { createMasterPassword } = useUserData()

  const schema = Validator.object({
    password: Validator.string().required(i18n._('Password is required')),
    passwordConfirm: Validator.string().required(i18n._('Password is required'))
  })

  const { initVaults } = useVaults({
    shouldSkip: true,
    onInitialize: () => {
      navigate(currentPage, { state: 'masterPassword' })
    }
  })

  const { register, handleSubmit, setErrors } = useForm({
    initialValues: {
      password: '',
      passwordConfirm: ''
    },
    validate: (values) => {
      return schema.validate(values)
    }
  })

  const onSubmit = async (values) => {
    if (values.password !== values.passwordConfirm) {
      setErrors({
        passwordConfirm: i18n._('Passwords do not match')
      })

      return
    }

    await createMasterPassword(values.password)

    await initVaults(values.password)
  }

  return html`
    <${CardContainer} onSubmit=${handleSubmit(onSubmit)}>
      <${CardTitle}>
        <${Title}> ${i18n._('Create Master Password')} <//>

        <${Description}>
          ${i18n._('Create a master password to secure your vaults')}
        <//>
      <//>

      <${PearPassPasswordField} ...${register('password')} />

      <${PearPassPasswordField} ...${register('passwordConfirm')} />

      <${ButtonWrapper}>
        <${ButtonPrimary} type="submit"> ${i18n._('Continue')} <//>
      <//>
    <//>
  `
}
