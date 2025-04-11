import React from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useForm } from 'pear-apps-lib-ui-react-hooks'
import { Validator } from 'pear-apps-utils-validator'
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
import { RECORD_TYPES, useCreateRecord, useRecords } from 'pearpass-lib-vault'

import { CreateCustomField } from '../../../../components/CreateCustomField'
import { FolderDropdown } from '../../../../components/FolderDropdown'
import { FormGroup } from '../../../../components/FormGroup'
import { FormModalHeaderWrapper } from '../../../../components/FormModalHeaderWrapper'
import { FormWrapper } from '../../../../components/FormWrapper'
import { InputFieldNote } from '../../../../components/InputFieldNote'
import { RecordTypeMenu } from '../../../../components/RecordTypeMenu'
import { useGlobalLoading } from '../../../../context/LoadingContext'
import { useModal } from '../../../../context/ModalContext'
import { useToast } from '../../../../context/ToastContext'
import { useCreateOrEditRecord } from '../../../../hooks/useCreateOrEditRecord'
import { addHttps } from '../../../../utils/addHttps'
import { isFavorite } from '../../../../utils/isFavorite'
import { CustomFields } from '../../../CustomFields'
import { ModalContent } from '../../ModalContent'
import { DropdownsWrapper } from '../../styles'

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
  const { setToast } = useToast()

  const { createRecord, isLoading: isCreateLoading } = useCreateRecord({
    onCompleted: () => {
      closeModal()

      setToast({
        message: i18n._('Record created successfully')
      })
    }
  })

  const { updateRecords, isLoading: isUpdateLoading } = useRecords({
    onCompleted: () => {
      closeModal()

      setToast({
        message: i18n._('Record updated successfully')
      })
    }
  })

  const isLoading = isCreateLoading || isUpdateLoading

  useGlobalLoading({ isLoading })

  const schema = Validator.object({
    title: Validator.string().required(i18n._('Title is required')),
    username: Validator.string(),
    password: Validator.string(),
    note: Validator.string(),
    websites: Validator.array().items(
      Validator.object({
        website: Validator.string().website('Wrong format of website')
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
    validate: (values) => schema.validate(values)
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
          .filter((website) => !!website?.website?.trim().length)
          .map((website) => addHttps(website.website)),
        customFields: values.customFields
      }
    }

    if (initialRecord) {
      updateRecords([
        {
          ...initialRecord,
          ...data
        }
      ])
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
      onSubmit=${handleSubmit(onSubmit)}
      headerChildren=${html`
        <${FormModalHeaderWrapper}
          buttons=${html`
            <${ButtonLittle} startIcon=${SaveIcon} type="submit">
              ${i18n._('Save')}
            <//>
          `}
        >
          <${DropdownsWrapper}>
            <${FolderDropdown}
              selectedFolder=${values?.folder}
              onFolderSelect=${(folder) => setValue('folder', folder?.name)}
            />
            ${!initialRecord &&
            html` <${RecordTypeMenu}
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
            hasStrongness
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
          ${websitesList.map(
            (website, index) => html`
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
          )}
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
    <//>
  `
}
