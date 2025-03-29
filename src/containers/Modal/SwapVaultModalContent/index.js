import { useMemo } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useForm } from 'pear-apps-lib-ui-react-hooks'
import { Validator } from 'pear-apps-utils-validator'
import {
  ButtonPrimary,
  PearPassPasswordField
} from 'pearpass-lib-ui-react-components'
import { useVault } from 'pearpass-lib-vault'

import { FormModalHeaderWrapper } from '../../../components/FormModalHeaderWrapper'
import { useModal } from '../../../context/ModalContext'
import { ModalContent } from '../ModalContent'
import { Description, Header, Title, UnlockVaultContainer } from './styles'
import { useLoadingContext } from '../../../context/LoadingContext'

export const SwapVaultModalContent = ({ vault }) => {
  const { i18n } = useLingui()
  const { closeModal } = useModal()
  const { setIsLoading } = useLoadingContext()

  const schema = Validator.object({
    password: Validator.string().required(i18n._('Password is required'))
  })

  const { register, handleSubmit } = useForm({
    initialValues: {
      password: ''
    },
    validate: (values) => {
      return schema.validate(values)
    }
  })

  const { refetch } = useVault({ shouldSkip: true })

  const submit = async () => {
    try {
      setIsLoading(true)

      await refetch(vault.id)

      setIsLoading(false)
      closeModal()
    } catch (error) {
      console.error(error)

      setIsLoading(false)
    }
  }

  const titles = useMemo(
    () => ({
      title: i18n._('Enter Your Vault Password'),
      description: i18n._(
        'Unlock your {vaultName} Vault to access your stored passwords.',
        {
          vaultName: vault.name ?? vault.id
        }
      )
    }),
    []
  )

  return html` <${ModalContent}
    onClose=${closeModal}
    headerChildren=${html`
      <${FormModalHeaderWrapper}>
        <${Header}>
          <${Title}> ${titles.title} <//>
          <${Description}> ${titles.description}<//>
        <//>
      <//>
    `}
  >
    <${UnlockVaultContainer}>
      <${PearPassPasswordField} ...${register('password')} />

      <${ButtonPrimary} onClick=${handleSubmit(submit)}> ${i18n._('Unlock Vault')} </>
    <//>
<//>`
}
