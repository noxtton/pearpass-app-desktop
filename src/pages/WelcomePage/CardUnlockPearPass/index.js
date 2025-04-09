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

export const CardUnlockPearPass = () => {
  const { i18n } = useLingui()
  const { currentPage, navigate } = useRouter()

  const schema = Validator.object({
    password: Validator.string().required(i18n._('Password is required'))
  })

  const { logIn } = useUserData()

  const { initVaults } = useVaults({
    shouldSkip: true,
    onInitialize: () => {
      navigate(currentPage, { state: 'vaults' })
    }
  })

  const { register, handleSubmit, setErrors } = useForm({
    initialValues: { password: '' },
    validate: (values) => schema.validate(values)
  })

  const onSubmit = async (values) => {
    try {
      await logIn({ password: values.password })

      await initVaults({ password: values.password })
    } catch (error) {
      setErrors({
        password: typeof error === 'string' ? error : i18n._('Invalid password')
      })
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

      <${PearPassPasswordField}
        placeholder=${i18n._('Master password')}
        ...${register('password')}
      />

      <${ButtonWrapper}>
        <${ButtonPrimary} type="submit"> ${i18n._('Continue')} <//>
      <//>
    <//>
  `
}
