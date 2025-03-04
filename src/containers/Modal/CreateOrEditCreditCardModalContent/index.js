import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useForm } from 'pearpass-lib-form'
import {
  InputField,
  ButtonLittle,
  SaveIcon,
  UserIcon,
  CreditCardIcon,
  CalendarIcon,
  NineDotsIcon
} from 'pearpass-lib-ui-react-components'
import { Validator } from 'pearpass-lib-validator'
import {
  useCreateRecord,
  useUpdateRecord,
  RECORD_TYPES
} from 'pearpass-lib-vault-desktop'

import { CreateCustomField } from '../../../components/CreateCustomField'
import { FolderDropdown } from '../../../components/FolderDropdown'
import { FormGroup } from '../../../components/FormGroup'
import { FormModalHeaderWrapper } from '../../../components/FormModalHeaderWrapper'
import { FormWrapper } from '../../../components/FormWrapper'
import { InputFieldNote } from '../../../components/InputFieldNote'
import { LoadingOverlay } from '../../../components/LoadingOverlay'
import { RecordTypeMenu } from '../../../components/RecordTypeMenu'
import { useModal } from '../../../context/ModalContext'
import { isFavorite } from '../../../utils/isFavorite'
import { CustomFields } from '../../CustomFields'
import { ModalContent } from '../ModalContent'
import { DropdownsWrapper } from '../styles'

/**
 * @param {{
 *   initialRecord: {
 *   data: {
 *    title: string
 *    name: string
 *    number: string
 *    expireDate: string
 *    securityCode: string
 *    pinCode: string
 *    note: string
 *    customFields: {
 *       type: string
 *       name: string
 *    }[]
 *  }
 * }
 *  selectedFolder?: string
 *  onTypeChange: (type: string) => void
 * }} props
 */
export const CreateOrEditCreditCardModalContent = ({
  initialRecord,
  selectedFolder,
  onTypeChange
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
    name: Validator.string(),
    number: Validator.string(),
    expireDate: Validator.string(),
    securityCode: Validator.string(),
    pinCode: Validator.string(),
    note: Validator.string(),
    customFields: Validator.array().items(
      Validator.object({
        note: Validator.string().required(i18n._('Note is required'))
      })
    ),
    folder: Validator.string()
  })

  const { values, register, handleSubmit, registerArray, setValue } = useForm({
    initialValues: {
      title: initialRecord?.data?.title ?? '',
      name: initialRecord?.data?.name ?? '',
      number: initialRecord?.data?.number ?? '',
      expireDate: initialRecord?.data?.expireDate ?? '',
      securityCode: initialRecord?.data?.securityCode ?? '',
      pinCode: initialRecord?.data?.pinCode ?? '',
      note: initialRecord?.data?.note ?? '',
      customFields: initialRecord?.data?.customFields ?? [],
      folder: selectedFolder ?? initialRecord?.folder
    },
    validate: (values) => {
      return schema.validate(values)
    }
  })

  const { value: list, addItem, registerItem } = registerArray('customFields')

  const onSubmit = (values) => {
    const data = {
      type: RECORD_TYPES.CREDIT_CARD,
      folder: isFavorite(values.folder) ? undefined : values.folder,
      isFavorite: isFavorite(values.folder),
      data: {
        title: values.title,
        name: values.name,
        number: values.number,
        expireDate: values.expireDate,
        securityCode: values.securityCode,
        pinCode: values.pinCode,
        note: values.note,
        customFields: values.customFields
      }
    }

    if (initialRecord) {
      updateRecord({ ...initialRecord, ...data })
    } else {
      createRecord(data)
    }
  }

  const handleRecordTypeChange = (item) => {
    onTypeChange(item)
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
              ${i18n._('Save')}
            <//>
          `}
        >
          <${DropdownsWrapper}>
            <${FolderDropdown}
              selectedFolder=${values?.folder}
              onFolderSelect=${(folder) => setValue('folder', folder.name)}
            />
            ${!initialRecord &&
            html` <${RecordTypeMenu}
              selectedRecord=${RECORD_TYPES.CREDIT_CARD}
              onRecordSelect=${(record) => handleRecordTypeChange(record?.type)}
            />`}
          <//>
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
            ...${register('name')}
          />

          <${InputField}
            label=${i18n._('Number on card')}
            placeholder="1234 1234 1234 1234 "
            variant="outline"
            icon=${CreditCardIcon}
            ...${register('number')}
          />

          <${InputField}
            label=${i18n._('Date of expire')}
            placeholder="MM/AA"
            variant="outline"
            icon=${CalendarIcon}
            ...${register('expireDate')}
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
