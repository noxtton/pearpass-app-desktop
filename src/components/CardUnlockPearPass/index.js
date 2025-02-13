import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useForm } from 'pearpass-lib-form'
import {
  ButtonPrimary,
  PearPassPasswordField
} from 'pearpass-lib-ui-react-components'
import { Validator } from 'pearpass-lib-validator'

import {
  ButtonWrapper,
  CardContainer,
  CardTitle,
  Description,
  Title
} from './styles'
import { useRouter } from '../../context/RouterContext'

export const CardUnlockPearPass = () => {
  const { i18n } = useLingui()
  const { currentPage, navigate } = useRouter()

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
    navigate(currentPage, { state: 'vaults' })
  }

  const onSubmit = (values) => {
    const data = { password: values.password }

    handleContinue(data)
  }

  return html`
    <${CardContainer}>
      <${CardTitle}>
        <${Title}> ${i18n._('Unlock PearPass')} <//>
        <${Description}>
          ${i18n._('Unlock PearPass with your master password')}
        <//>
      <//>

      <${PearPassPasswordField} ...${register('password')} />
      <${ButtonWrapper}>
        <${ButtonPrimary} onClick=${handleSubmit(onSubmit)}>
          ${i18n._('Continue')}
        <//>
      <//>
    <//>
  `
}
