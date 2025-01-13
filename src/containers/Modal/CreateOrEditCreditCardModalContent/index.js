import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  InputField,
  ButtonLittle,
  SaveIcon,
  UserIcon,
  CreditCardIcon,
  CalendarIcon,
  NineDotsIcon
} from 'pearpass-lib-ui-react-components'

import { CreateCustomField } from '../../../components/CreateCustomField'
import { FolderDropdown } from '../../../components/FolderDropdown'
import { FormGroup } from '../../../components/FormGroup'
import { FormModalHeaderWrapper } from '../../../components/FormModalHeaderWrapper'
import { FormWrapper } from '../../../components/FormWrapper'
import { InputFieldNote } from '../../../components/InputFieldNote'
import { useModal } from '../../../context/ModalContext'
import { useForm } from '../../../hooks/useForm'
import { Validator } from '../../../utils/validator'
import { CustomFields } from '../../CustomFields'
import { ModalContent } from '../ModalContent'

const schema = Validator.object({
  title: Validator.string().required('Title is required'),
  fullName: Validator.string(),
  numberOnCard: Validator.string(),
  dateOfExpire: Validator.string(),
  securityCode: Validator.string(),
  pinCode: Validator.string(),
  customFields: Validator.array().items(
    Validator.object({
      note: Validator.string().required('Type is required')
    })
  )
})

export const CreateOrEditCreditCardModalContent = () => {
  const { i18n } = useLingui()
  const { closeModal } = useModal()

  const form = useForm({
    initialValues: {
      title: '',
      fullName: '',
      numberOnCard: '',
      dateOfExpire: '',
      securityCode: '',
      pinCode: ''
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
              startIcon=${SaveIcon}
              onClick=${handleSubmit(onSubmit)}
            >
              ${i18n._('Credit card')}
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

        <${FormGroup}>
          <${InputField}
            label=${i18n._('Full name')}
            placeholder=${i18n._('Full name')}
            variant="outline"
            icon=${UserIcon}
            ...${register('fullName')}
          />

          <${InputField}
            label=${i18n._('Number on card')}
            placeholder="1234 1234 1234 1234 "
            variant="outline"
            icon=${CreditCardIcon}
            ...${register('numberOnCard')}
          />

          <${InputField}
            label=${i18n._('Date of expire')}
            placeholder="MM/AA"
            variant="outline"
            icon=${CalendarIcon}
            ...${register('dateOfExpire')}
          />

          <${InputField}
            label=${i18n._('Security code')}
            placeholder="123"
            variant="outline"
            icon=${CreditCardIcon}
            ...${register('securityCode')}
          />

          <${InputField}
            label=${i18n._('Pin code')}
            placeholder="1234"
            variant="outline"
            icon=${NineDotsIcon}
            ...${register('pinCode')}
          />
        <//>

        <${FormGroup}>
          <${InputFieldNote} />
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
