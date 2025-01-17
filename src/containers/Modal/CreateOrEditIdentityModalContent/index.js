import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  InputField,
  ButtonLittle,
  SaveIcon,
  UserIcon,
  ImageIcon,
  EmailIcon,
  PhoneIcon
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
import { UploadImageModalContent } from '../UploadImageModalContent'

export const CreateOrEditIdentityModalContent = () => {
  const { i18n } = useLingui()
  const { setModal, closeModal } = useModal()

  const schema = Validator.object({
    title: Validator.string().required(i18n._('Title is required')),
    fullName: Validator.string(),
    email: Validator.string().email(i18n._('Invalid email format')),
    phoneNumber: Validator.string(),
    address: Validator.string(),
    cap: Validator.string(),
    city: Validator.string(),
    region: Validator.string(),
    country: Validator.string(),
    note: Validator.string(),
    customFields: Validator.array().items(
      Validator.object({
        note: Validator.string().required(i18n._('Note is required'))
      })
    )
  })

  const form = useForm({
    initialValues: {
      title: '',
      fullName: '',
      email: '',
      phoneNumber: '',
      address: '',
      cap: '',
      city: '',
      region: '',
      country: '',
      note: ''
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

  const onLoadPicture = () => {
    setModal(html` <${UploadImageModalContent} /> `)
  }

  return html`
    <${ModalContent}
      onClose=${closeModal}
      headerChildren=${html`
        <${FormModalHeaderWrapper}
          buttons=${html`
            <${ButtonLittle} onClick=${onLoadPicture} startIcon=${ImageIcon}>
              ${i18n._('Load picture')}
            <//>

            <${ButtonLittle}
              onClick=${handleSubmit(onSubmit)}
              startIcon=${SaveIcon}
            >
              ${i18n._('Identity')}
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

        <${FormGroup} title=${i18n._('Personal information')} isCollapse>
          <${InputField}
            label=${i18n._('Full name')}
            placeholder=${i18n._('Full name')}
            variant="outline"
            icon=${UserIcon}
            ...${register('fullname')}
          />

          <${InputField}
            label=${i18n._('Email')}
            placeholder=${i18n._('Insert email')}
            variant="outline"
            icon=${EmailIcon}
            ...${register('email')}
          />

          <${InputField}
            label=${i18n._('Phone number ')}
            placeholder=${i18n._('Phone number ')}
            variant="outline"
            icon=${PhoneIcon}
            ...${register('phoneNumber')}
          />
        <//>

        <${FormGroup} title=${i18n._('Detail of address')} isCollapse>
          <${InputField}
            label=${i18n._('Address')}
            placeholder=${i18n._('Address')}
            variant="outline"
            ...${register('address')}
          />

          <${InputField}
            label=${i18n._('CAP')}
            placeholder=${i18n._('Inser cap')}
            variant="outline"
            ...${register('cap')}
          />

          <${InputField}
            label=${i18n._('City')}
            placeholder=${i18n._('City')}
            variant="outline"
            ...${register('city')}
          />

          <${InputField}
            label=${i18n._('Region')}
            placeholder=${i18n._('Region')}
            variant="outline"
            ...${register('region')}
          />

          <${InputField}
            label=${i18n._('Country')}
            placeholder=${i18n._('Country')}
            variant="outline"
            ...${register('country')}
          />
        <//>

        <${FormGroup}>
          <${InputFieldNote} ...${register('note')} />
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
