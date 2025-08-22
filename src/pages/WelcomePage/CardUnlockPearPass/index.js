import { useState } from 'react'

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
  InputWrapper,
  Title
} from './styles'
import { AlertBox } from '../../../components/AlertBox'
import { useGlobalLoading } from '../../../context/LoadingContext'
import { useRouter } from '../../../context/RouterContext'
import { logger } from '../../../utils/logger'

export const CardUnlockPearPass = () => {
  const { i18n } = useLingui()
  const { currentPage, navigate } = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  useGlobalLoading({ isLoading })

  const schema = Validator.object({
    password: Validator.string().required(i18n._('Password is required'))
  })

  const { logIn } = useUserData()

  const { initVaults } = useVaults()

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

      await initVaults({ password: values.password })

      setIsLoading(false)

      navigate(currentPage, { state: 'vaults' })
    } catch (error) {
      setIsLoading(false)

      setErrors({
        password: i18n._('Invalid password')
      })

      logger.error('useGetMultipleFiles', 'Error unlocking PearPass:', error)
    }
  }

  return html`
    <${CardContainer} onSubmit=${handleSubmit(onSubmit)}>
      <${CardTitle}>
        <${Title}> ${i18n._('Unlock PearPass')}<//>

        <${Description}>
          ${i18n._('Unlock PearPass with your master password')}
        <//>
      <//>

      <${InputWrapper}>
        <${PearPassPasswordField}
          placeholder=${i18n._('Master password')}
          ...${register('password')}
        />

        <${AlertBox}
          message=${i18n._(
            'Don’t forget your master password. It’s the only way to access your vault. We can’t help recover it. Back it up securely.'
          )}
        />
      <//>

      <${ButtonWrapper}>
        <${ButtonPrimary} type="submit"> ${i18n._('Continue')} <//>
      <//>
    <//>
  `
}
