import { useMemo, useState } from 'react'

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

export const SwapVaultModalContent = () => {
  const { i18n } = useLingui()
  const { closeModal } = useModal()

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

  const [vault] = useState('')

  const submit = async () => {
    await refetch(vault)

    closeModal()
  }

  const titles = useMemo(
    () => ({
      title: i18n._('Insert Vault’s password'),
      description: i18n._('Unlock with the {vaultName} Vault password', {
        vaultName: vault
      })
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

      <${ButtonPrimary} onClick=${handleSubmit(submit)}> ${i18n._('Submit')} </>
    <//>
<//>`
}
