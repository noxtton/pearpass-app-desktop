import { useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useForm } from 'pear-apps-lib-ui-react-hooks'
import { Validator } from 'pear-apps-utils-validator'
import { useUserData } from 'pearpass-lib-vault'

import { ButtonWrapper, CardContainer, CardTitle, Title } from './styles'
import { useGlobalLoading } from '../../context/LoadingContext'
import { ButtonPrimary, PearPassPasswordField } from '../../lib-react-components'
import { logger } from '../../utils/logger'

export const AuthenticationCard = ({
  title,
  buttonLabel,
  descriptionComponent,
  onSuccess,
  style
}) => {
  const { i18n } = useLingui()

  const [isLoading, setIsLoading] = useState(false)

  useGlobalLoading({ isLoading })

  const schema = Validator.object({
    password: Validator.string().required(i18n._('Password is required'))
  })

  const { logIn } = useUserData()

  const { register, handleSubmit, setErrors } = useForm({
    initialValues: { password: '' },
    validate: (values) => schema.validate(values)
  })

  const onSubmit = async (values) => {
    if (isLoading) {
      return
    }

    if (!values.password) {
      setErrors({
        password: i18n._('Password is required')
      })

      return
    }

    try {
      setIsLoading(true)

      await logIn({ password: values.password })

      await onSuccess?.(values.password)

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)

      setErrors({
        password: i18n._('Invalid password')
      })

      logger.error('AuthenticationCard', 'Error unlocking with master password:', error)
    }
  }

  return html`
    <${CardContainer} onSubmit=${handleSubmit(onSubmit)} style=${style}>
      <${CardTitle}>
        <${Title}> ${title}<//> 
      <//>

      <${PearPassPasswordField}
        placeholder=${i18n._('Master password')}
        ...${register('password')}
      />

      ${descriptionComponent}

      <${ButtonWrapper}>
        <${ButtonPrimary} type="submit">
          ${buttonLabel}
        <//>
      <//>
    <//>
  `
}
