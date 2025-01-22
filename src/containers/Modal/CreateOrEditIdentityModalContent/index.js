import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useForm } from 'pearpass-lib-form'
import {
  InputField,
  ButtonLittle,
  SaveIcon,
  UserIcon,
  EmailIcon,
  PhoneIcon
} from 'pearpass-lib-ui-react-components'
import { Validator } from 'pearpass-lib-validator'
import { useCreateRecord, useUpdateRecord } from 'pearpass-lib-vault'
import { RECORD_TYPES } from 'pearpass-lib-vault'

import { CreateCustomField } from '../../../components/CreateCustomField'
import { FolderDropdown } from '../../../components/FolderDropdown'
import { FormGroup } from '../../../components/FormGroup'
import { FormModalHeaderWrapper } from '../../../components/FormModalHeaderWrapper'
import { FormWrapper } from '../../../components/FormWrapper'
import { InputFieldNote } from '../../../components/InputFieldNote'
import { LoadingOverlay } from '../../../components/LoadingOverlay'
import { useModal } from '../../../context/ModalContext'
import { CustomFields } from '../../CustomFields'
import { ModalContent } from '../ModalContent'

/**
 * @param {{
 *   initialRecord: {
 *    data: {
 *     title: string
 *     fullName: string
 *     email: string
 *     phoneNumber: string
 *     address: string
 *     zip: string
 *     city: string
 *     region: string
 *     country: string
 *     note: string
 *     customFields: {
 *       note: string
 *       type: string
 *     }[]
 *   }
 *  }
 *  selectedFolder?: string
 * }} props
 */
export const CreateOrEditIdentityModalContent = ({
  initialRecord,
  selectedFolder
}) => {
  const { i18n } = useLingui()
  const { closeModal } = useModal()

  const { createRecord, isLoading: isCreateLoading } = useCreateRecord({
    onCompleted: () => {
      closeModal()
    }
  })

  const { updateRecord, isLoading: isUpdateLoading } = useUpdateRecord({
    onCompleted: () => {
      closeModal()
    }
  })

  const isLoading = isCreateLoading || isUpdateLoading

  const schema = Validator.object({
    title: Validator.string().required(i18n._('Title is required')),
    fullName: Validator.string(),
    email: Validator.string().email(i18n._('Invalid email format')),
    phoneNumber: Validator.string(),
    address: Validator.string(),
    zip: Validator.string(),
    city: Validator.string(),
    region: Validator.string(),
    country: Validator.string(),
    note: Validator.string(),
    customFields: Validator.array().items(
      Validator.object({
        note: Validator.string().required(i18n._('Note is required'))
      })
    ),
    folder: Validator.string()
  })

  const { register, handleSubmit, registerArray, values, setValue } = useForm({
    initialValues: {
      title: initialRecord?.data?.title ?? '',
      fullName: initialRecord?.data?.fullName ?? '',
      email: initialRecord?.data?.email ?? '',
      phoneNumber: initialRecord?.data?.phoneNumber ?? '',
      address: initialRecord?.data?.address ?? '',
      zip: initialRecord?.data?.zip ?? '',
      city: initialRecord?.data?.city ?? '',
      region: initialRecord?.data?.region ?? '',
      country: initialRecord?.data?.country ?? '',
      note: initialRecord?.data?.note ?? '',
      customFields: initialRecord?.data?.customFields || [],
      folder: selectedFolder ?? initialRecord?.folder
    },
    validate: (values) => {
      return schema.validate(values)
    }
  })

  const { value: list, addItem, registerItem } = registerArray('customFields')

  const onSubmit = (values) => {
    const data = {
      type: RECORD_TYPES.IDENTITY,
      folder: values.folder,
      data: {
        title: values.title,
        fullName: values.fullName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        address: values.address,
        zip: values.zip,
        city: values.city,
        region: values.region,
        country: values.country,
        note: values.note,
        customFields: values.customFields
      }
    }

    if (initialRecord) {
      updateRecord({
        ...initialRecord,
        ...data
      })
    } else {
      createRecord(data)
    }
  }

  return html`
    <${ModalContent}
      onClose=${closeModal}
      headerChildren=${html`
        <${FormModalHeaderWrapper}
          buttons=${html`
            <${ButtonLittle}
              onClick=${handleSubmit(onSubmit)}
              startIcon=${SaveIcon}
            >
              ${i18n._('Identity')}
            <//>
          `}
        >
          <${FolderDropdown}
            selectedFolder=${values?.folder}
            onFolderSelect=${(folder) => setValue('folder', folder)}
          />
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
            label=${i18n._('ZIP')}
            placeholder=${i18n._('Insert zip')}
            variant="outline"
            ...${register('zip')}
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

      ${isLoading && html`<${LoadingOverlay} />`}
    <//>
  `
}
