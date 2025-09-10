import { useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useForm } from 'pear-apps-lib-ui-react-hooks'
import { Validator } from 'pear-apps-utils-validator'
import { useCreateVault, useVault } from 'pearpass-lib-vault'

import {
  ButtonWrapper,
  CardTitle,
  FieldWrapper,
  Form,
  InputsContainer,
  Label,
  Title
} from './styles'
import { useGlobalLoading } from '../../../context/LoadingContext'
import { useRouter } from '../../../context/RouterContext'
import {
  ButtonPrimary,
  ButtonSecondary,
  PearPassInputField,
  PearPassPasswordField
} from '../../../lib-react-components'
import { getDeviceName } from '../../../utils/getDeviceName'
import { logger } from '../../../utils/logger'

export const CardNewVaultCredentials = () => {
  const { i18n } = useLingui()
  const { navigate, currentPage } = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  useGlobalLoading({ isLoading })

  const schema = Validator.object({
    name: Validator.string().required(i18n._('Name is required')),
    password: Validator.string(),
    passwordConfirm: Validator.string()
  })

  const { addDevice } = useVault()

  const { createVault } = useCreateVault()

  const { register, handleSubmit, setErrors } = useForm({
    initialValues: {
      name: ''
    },
    validate: (values) => schema.validate(values)
  })

  const onSubmit = async (values) => {
    if (isLoading) {
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

      await createVault({
        name: values.name,
        password: values.password
      })
      await addDevice(getDeviceName())
      navigate('vault', { recordType: 'all' })

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)

      logger.error(
        'useGetMultipleFiles',
        'Error creating master password:',
        error
      )
    }
  }

  return html`
    <${Form} onSubmit=${handleSubmit(onSubmit)}>
      <${CardTitle}>
        <${Title}> ${i18n._('Create new Vault')} <//>
      <//>

      <${InputsContainer}>
        <${FieldWrapper}>
          <${Label} for="name"> ${i18n._('Vault name')} <//>
          <${PearPassInputField}
            placeholder=${i18n._('Enter Name')}
            ...${register('name')}
          />
        <//>
        <${FieldWrapper}>
          <${Label} for="name"> ${i18n._('Create password (optional)')} <//>
          <${PearPassPasswordField}
            placeholder=${i18n._('Enter Password')}
            ...${register('password')}
          />
        <//>

        <${FieldWrapper}>
          <${Label} for="name"> ${i18n._('Confirm Password')} <//>
          <${PearPassPasswordField}
            placeholder=${i18n._('Confirm Password')}
            ...${register('passwordConfirm')}
          />
        <//>
      <//>

      <${ButtonWrapper}>
        <${ButtonPrimary} size="md" type="submit">
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
  `
}
