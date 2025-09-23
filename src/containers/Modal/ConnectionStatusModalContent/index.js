import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useForm } from 'pear-apps-lib-ui-react-hooks'
import { Validator } from 'pear-apps-utils-validator'

import {
  InputLabel,
  ModalActions,
  ModalContainer,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle
} from './styles'
import { useModal } from '../../../context/ModalContext'
import {
  ButtonPrimary,
  ButtonSecondary,
  PearPassInputField
} from '../../../lib-react-components'

export const ConnectionStatusModalContent = ({ onSubmit }) => {
  const { i18n } = useLingui()
  const { closeModal } = useModal()

  const schema = Validator.object({
    id: Validator.string().required(i18n._('ID is required'))
  })

  const { register, handleSubmit, values } = useForm({
    initialValues: { id: '' },
    validate: (values) => schema.validate(values)
  })

  return html`
    <${ModalContainer}>
      <${ModalHeader}>
        <${ModalTitle}> ${i18n._('Connect Browser Extension')} <//>
        <${ModalDescription}>
          ${i18n._(
            'Go in your browser extension settings and attach here the extension ID'
          )}
        <//>
      <//>
      <${ModalContent}>
        <${InputLabel}> ${i18n._('Insert extension ID')} <//>
        <${PearPassInputField} ...${register('id')} />
      <//>
      <${ModalActions}>
        <${ButtonPrimary} onClick=${handleSubmit(() => onSubmit(values.id))}>
          ${i18n._('Continue')}
        <//>
        <${ButtonSecondary} onClick=${closeModal}> ${i18n._('Cancel')} <//>
      <//>
    <//>
  `
}
