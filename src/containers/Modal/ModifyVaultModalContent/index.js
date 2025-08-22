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
import { useVault } from 'pearpass-lib-vault'

import { useModal } from '../../../context/ModalContext'
import { ModalContent } from '../ModalContent'
import {
  Content,
  InputLabel,
  InputWrapper,
  ModalActions,
  ModalTitle
} from './styles'
import { useLoadingContext } from '../../../context/LoadingContext'
import { logger } from '../../../utils/logger'

export const ModifyVaultModalContent = ({ vaultId, vaultName }) => {
  const { i18n } = useLingui()
  const { closeModal } = useModal()

  const { isVaultProtected, updateVault, refetch: refetchVault } = useVault()

  const [isProtected, setIsProtected] = useState(false)
  const { setIsLoading } = useLoadingContext()

  const schema = Validator.object({
    name: Validator.string().required(i18n._('Name is required')),
    newPassword: Validator.string(),
    repeatPassword: Validator.string()
  })

  const { register, handleSubmit, setErrors } = useForm({
    initialValues: {
      name: vaultName,
      currentPassword: '',
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

    if (isProtected && !values.currentPassword?.length) {
      setErrors({
        currentPassword: i18n._('Current password is required')
      })

      return
    }

    try {
      setIsLoading(true)

      await updateVault(vaultId, {
        name: values.name,
        password: values.newPassword,
        currentPassword: isProtected ? values.currentPassword : undefined
      })

      setIsLoading(false)

      closeModal()
    } catch (error) {
      setIsLoading(false)
      logger.error('ModifyVaultModalContent', 'Error updating vault:', error)
      setErrors({
        currentPassword: i18n._('Invalid password')
      })
    }
  }

  useEffect(() => {
    const checkProtection = async () => {
      const result = await isVaultProtected(vaultId)
      setIsProtected(result)
    }
    checkProtection()
  }, [vaultId])

  useEffect(() => {
    refetchVault()
  }, [])

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
          <${PearPassPasswordField} ...${register('currentPassword')} />
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
