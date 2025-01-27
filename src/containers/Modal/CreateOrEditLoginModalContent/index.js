import React from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useForm } from 'pearpass-lib-form'
import {
  ButtonLittle,
  ButtonSingleInput,
  CompoundField,
  DeleteIcon,
  InputField,
  KeyIcon,
  PasswordField,
  PasswordIcon,
  PlusIcon,
  SaveIcon,
  UserIcon,
  WorldIcon
} from 'pearpass-lib-ui-react-components'
import { Validator } from 'pearpass-lib-validator'
import {
  RECORD_TYPES,
  useCreateRecord,
  useUpdateRecord
} from 'pearpass-lib-vault'

import { CreateCustomField } from '../../../components/CreateCustomField'
import { FolderDropdown } from '../../../components/FolderDropdown'
import { FormGroup } from '../../../components/FormGroup'
import { FormModalHeaderWrapper } from '../../../components/FormModalHeaderWrapper'
import { FormWrapper } from '../../../components/FormWrapper'
import { InputFieldNote } from '../../../components/InputFieldNote'
import { LoadingOverlay } from '../../../components/LoadingOverlay'
import { RecordTypeDropdown } from '../../../components/RecordTypeDropDown'
import { useModal } from '../../../context/ModalContext'
import { useCreateOrEditRecord } from '../../../hooks/useCreateOrEditRecord'
import { isFavorite } from '../../../utils/isFavorite'
import { CustomFields } from '../../CustomFields'
import { ModalContent } from '../ModalContent'
import { DropdownsWrapper } from '../styles'

/**
 * @param {{
 *   initialRecord: {
 *   data: {
 *    title: string
 *    username: string
 *    password: string
 *    note: string
 *    websites: string[]
 *    customFields: {
 *        type: string
 *        name: string
 *     }[]
 *    }
 *  }
 *  selectedFolder?: string
 *  onTypeChange: (type: string) => void
 * }} props
 */
export const CreateOrEditLoginModalContent = ({
  initialRecord,
  selectedFolder,
  onTypeChange
}) => {
  const { i18n } = useLingui()
  const { closeModal } = useModal()
  const { handleCreateOrEditRecord } = useCreateOrEditRecord()

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
    username: Validator.string(),
    password: Validator.string(),
    note: Validator.string(),
    websites: Validator.array().items(
      Validator.object({
        website: Validator.string()
      })
    ),
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
      username: initialRecord?.data?.username ?? '',
      password: initialRecord?.data?.password ?? '',
      note: initialRecord?.data?.note ?? '',
      websites: initialRecord?.data?.websites?.length
        ? initialRecord?.data?.websites.map((website) => ({ website }))
        : [{ name: 'website' }],
      customFields: initialRecord?.data.customFields ?? [],
      folder: selectedFolder ?? initialRecord?.folder
    },
    validate: (values) => {
      return schema.validate(values)
    }
  })

  const {
    value: websitesList,
    addItem,
    registerItem,
    removeItem
  } = registerArray('websites')

  const {
    value: customFieldsList,
    addItem: addCustomField,
    registerItem: registerCustomFieldItem
  } = registerArray('customFields')

  const onSubmit = (values) => {
    const data = {
      type: RECORD_TYPES.LOGIN,
      folder: isFavorite(values.folder) ? undefined : values.folder,
      isFavorite: isFavorite(values.folder),
      data: {
        title: values.title,
        username: values.username,
        password: values.password,
        note: values.note,
        websites: values.websites
          .map((website) => website.website)
          .filter((website) => !!website?.trim().length),
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

  const handleRecordTypeChange = (type) => {
    onTypeChange(type)
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
              ${i18n._('Login')}
            <//>
          `}
        >
          <${DropdownsWrapper}>
            <${FolderDropdown}
              selectedFolder=${values?.folder}
              onFolderSelect=${(folder) => setValue('folder', folder.name)}
            />
            ${!initialRecord &&
            html` <${RecordTypeDropdown}
              selectedRecord=${RECORD_TYPES.LOGIN}
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
            label=${i18n._('Email or username')}
            placeholder=${i18n._('Email or username')}
            variant="outline"
            icon=${UserIcon}
            ...${register('username')}
          />

          <${PasswordField}
            label=${i18n._('Password')}
            placeholder=${i18n._('Password')}
            variant="outline"
            icon=${KeyIcon}
            additionalItems=${html`
              <${ButtonSingleInput}
                startIcon=${PasswordIcon}
                onClick=${() =>
                  handleCreateOrEditRecord({
                    recordType: 'password',
                    setValue: (value) => setValue('password', value)
                  })}
              />
            `}
            ...${register('password')}
          />
        <//>

        <${CompoundField}>
          ${websitesList.map((website, index) => {
            return html`
              <${React.Fragment} key=${website.id}>
                <${InputField}
                  label=${i18n._('Website')}
                  placeholder=${i18n._('https://')}
                  icon=${WorldIcon}
                  ...${registerItem('website', index)}
                  additionalItems=${index === 0
                    ? html`
                        <${ButtonSingleInput}
                          startIcon=${PlusIcon}
                          onClick=${() => addItem({ name: 'website' })}
                        >
                          ${i18n._('Add website')}
                        <//>
                      `
                    : html`
                        <${ButtonSingleInput}
                          startIcon=${DeleteIcon}
                          onClick=${() => removeItem(index)}
                        >
                          ${i18n._('Remove website')}
                        <//>
                      `}
                />
              <//>
            `
          })}
        <//>

        <${FormGroup}>
          <${InputFieldNote} ...${register('note')} />
        <//>

        <${CustomFields}
          customFields=${customFieldsList}
          register=${registerCustomFieldItem}
        />

        <${FormGroup}>
          <${CreateCustomField}
            onCreateCustom=${(type) =>
              addCustomField({ type: type, name: type })}
          />
        <//>
      <//>

      ${isLoading && html`<${LoadingOverlay} />`}
    <//>
  `
}
