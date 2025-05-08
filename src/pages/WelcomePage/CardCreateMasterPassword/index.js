import { useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useForm } from 'pear-apps-lib-ui-react-hooks'
import { Validator } from 'pear-apps-utils-validator'
import {
  ButtonPrimary,
  PearPassPasswordField
} from 'pearpass-lib-ui-react-components'
import { useUserData } from 'pearpass-lib-vault'

import {
  ButtonWrapper,
  CardContainer,
  CardTitle,
  Description,
  Title
} from './styles'
import { useGlobalLoading } from '../../../context/LoadingContext'
import { useRouter } from '../../../context/RouterContext'
import { logger } from '../../../utils/logger'

export const CardCreateMasterPassword = () => {
  const { i18n } = useLingui()
  const { currentPage, navigate } = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  useGlobalLoading({ isLoading })

  const { createMasterPassword } = useUserData()

  const schema = Validator.object({
    password: Validator.string().required(i18n._('Password is required')),
    passwordConfirm: Validator.string().required(i18n._('Password is required'))
  })

  const { register, handleSubmit, setErrors } = useForm({
    initialValues: {
      password: '',
      passwordConfirm: ''
    },
    validate: (values) => schema.validate(values)
  })

  const onSubmit = async (values) => {
    if (isLoading) {
      return
    }

    if (!values.password || !values.passwordConfirm) {
      setErrors({
        password: i18n._('Password is required'),
        passwordConfirm: i18n._('Password is required')
      })

      return
    }

    if (values.password !== values.passwordConfirm) {
      setErrors({
        passwordConfirm: i18n._('Passwords do not match')
      })

      return
    }

    try {
      setIsLoading(true)

      await createMasterPassword(values.password)

      navigate(currentPage, { state: 'masterPassword' })

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)

      setErrors({
        password: i18n._('Error creating master password')
      })

      logger.error('Error creating master password:', error)
    }
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
