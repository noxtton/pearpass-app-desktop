import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  InputField,
  ButtonLittle,
  FolderIcon
} from 'pearpass-lib-ui-react-components'

import { useModal } from '../../../context/ModalContext'
import { ModalContent } from '../ModalContent'
import { HeaderWrapper } from './styles'
import { useForm } from '../../../hooks/useForm'
import { Validator } from '../../../utils/validator'

const schema = Validator.object({
  title: Validator.string().required('Title is required')
})

export const CreateFolderModalContent = () => {
  const { i18n } = useLingui()
  const { closeModal } = useModal()

  const { hasErrors, register, handleSubmit } = useForm({
    initialValues: {
      title: ''
    },
    validate: (values) => {
      return schema.validate(values)
    }
  })

  const onSubmit = () => {
    if (!hasErrors) {
      closeModal()
    }
  }

  return html`
    <${ModalContent}
      onClose=${closeModal}
      headerChildren=${html`
        <${HeaderWrapper}>
          <${ButtonLittle}
            startIcon=${FolderIcon}
            onClick=${handleSubmit(onSubmit)}
          >
            ${i18n._('Create folder')}
          <//>
        <//>
      `}
    >
      <${InputField}
        label=${i18n._('Title')}
        placeholder=${i18n._('Insert folder name')}
        variant="outline"
        ...${register('title')}
      />
    <//>
  `
}
