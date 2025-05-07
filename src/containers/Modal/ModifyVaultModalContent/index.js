import { useEffect, useState } from 'react'

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
import { useVault, useVaults } from 'pearpass-lib-vault'

import { useModal } from '../../../context/ModalContext'
import { ModalContent } from '../ModalContent'
import {
  Content,
  InputLabel,
  InputWrapper,
  ModalActions,
  ModalTitle
} from './styles'

export const ModifyVaultModalContent = ({ vaultId, vaultName }) => {
  const { i18n } = useLingui()
  const { closeModal } = useModal()
  const { isVaultProtected, updateVault } = useVault()
  const { refetch } = useVaults()

  const [isProtected, setIsProtected] = useState(false)

  useEffect(() => {
    const checkProtection = async () => {
      const result = await isVaultProtected(vaultId)
      setIsProtected(result)
    }
    checkProtection()
  }, [vaultId, isVaultProtected])

  const schema = Validator.object({
    name: Validator.string().required(i18n._('Name is required')),
    newPassword: Validator.string().required(i18n._('Password is required')),
    repeatPassword: Validator.string().required(i18n._('Password is required'))
  })

  const { register, handleSubmit, setErrors } = useForm({
    initialValues: {
      name: vaultName,
      oldPassword: '',
      newPassword: '',
      repeatPassword: ''
    },
    validate: (values) => schema.validate(values)
  })

  const onSubmit = async (values) => {
    if (values.newPassword !== values.repeatPassword) {
      setErrors({
        repeatPassword: i18n._('Passwords do not match')
      })

      return
    }

    try {
      await updateVault(vaultId, {
        name: values.name,
        password: values.newPassword,
        oldPassword: isProtected ? values.oldPassword : undefined
      })
      refetch()
      closeModal()
    } catch (error) {
      console.error('Error updating vault:', error)
      setErrors({
        oldPassword: i18n._('Invalid password')
      })
    }
  }

  return html` <${ModalContent}
    onClose=${closeModal}
    headerChildren=${html` <${ModalTitle}> ${i18n._('Modify Vault')} <//>`}
  >
    <${Content}>
      <${InputWrapper}>
        <${InputLabel}> ${i18n._('Insert vault name')} <//>
        <${PearPassInputField} ...${register('name')} />
      <//>
      ${isProtected &&
      html`
        <${InputWrapper}>
          <${InputLabel}> ${i18n._('Insert old password')} <//>
          <${PearPassPasswordField} ...${register('oldPassword')} />
        <//>
      `}

      <${InputWrapper}>
        <${InputLabel}> ${i18n._('Create new password')} <//>
        <${PearPassPasswordField} ...${register('newPassword')} />
      <//>
      <${InputWrapper}>
        <${InputLabel}> ${i18n._('Repeat new password')} <//>
        <${PearPassPasswordField} ...${register('repeatPassword')} />
      <//>
      <${ModalActions}>
        <${ButtonPrimary} onClick=${handleSubmit(onSubmit)}>
          ${i18n._('Continue')}
        <//>
        <${ButtonSecondary} onClick=${closeModal}> ${i18n._('Cancel')} <//>
      <//>
    <//>
  <//>`
}
