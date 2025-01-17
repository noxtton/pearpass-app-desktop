import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  InputField,
  ButtonLittle,
  SaveIcon
} from 'pearpass-lib-ui-react-components'

import { CreateCustomField } from '../../../components/CreateCustomField'
import { FolderDropdown } from '../../../components/FolderDropdown'
import { FormGroup } from '../../../components/FormGroup'
import { FormModalHeaderWrapper } from '../../../components/FormModalHeaderWrapper'
import { FormWrapper } from '../../../components/FormWrapper'
import { useModal } from '../../../context/ModalContext'
import { useForm } from '../../../hooks/useForm'
import { Validator } from '../../../utils/validator'
import { CustomFields } from '../../CustomFields'
import { ModalContent } from '../ModalContent'

export const CreateOrEditCustomModalContent = () => {
  const { i18n } = useLingui()
  const { closeModal } = useModal()

  const schema = Validator.object({
    title: Validator.string().required(i18n._('Title is required')),
    customFields: Validator.array().items(
      Validator.object({
        note: Validator.string().required(i18n._('Note is required'))
      })
    )
  })

  const form = useForm({
    initialValues: {
      title: ''
    },
    validate: (values) => {
      return schema.validate(values)
    }
  })

  const { hasErrors, register, handleSubmit, registerArray } = form

  const { value: list, addItem, registerItem } = registerArray('customFields')

  const onSubmit = () => {
    if (!hasErrors) {
      closeModal()
    }
  }

  return html`
    <${ModalContent}
      onClose=${closeModal}
      headerChildren=${html`
        <${FormModalHeaderWrapper}
          buttons=${html`
            <${ButtonLittle}
              leftIcon=${SaveIcon}
              onClick=${handleSubmit(onSubmit)}
            >
              ${i18n._('Custom')}
            <//>
          `}
        >
          <${FolderDropdown} />
        <//>
      `}
    >
      <${FormWrapper}>
        <${FormGroup}>
          <${InputField}
            label=${i18n._('Title')}
            placeholder=${i18n._('Insert title')}
            variant="outline"
            ...${register('title')}
          />
        <//>

        <${CustomFields} customFields=${list} register=${registerItem} />

        <${FormGroup}>
          <${CreateCustomField}
            onCreateCustom=${(type) => addItem({ type: type, name: type })}
          />
        <//>
      <//>
    <//>
  `
}
