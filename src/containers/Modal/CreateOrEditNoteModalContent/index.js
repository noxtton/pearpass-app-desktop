import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { Validator } from 'pear-apps-utils-validator'
import { useForm } from 'pearpass-lib-form'
import {
  InputField,
  ButtonLittle,
  SaveIcon,
  TextArea
} from 'pearpass-lib-ui-react-components'
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
 *    data: {
 *     title: string
 *     note: string
 *     customFields: {
 *        type: string
 *        name: string
 *      }[]
 *     }
 *    }
 *  selectedFolder?: string
 *  onTypeChange: (type: string) => void
 * }} props
 */
export const CreateOrEditNoteModalContent = ({
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
      type: RECORD_TYPES.NOTE,
      folder: isFavorite(values.folder) ? undefined : values.folder,
      isFavorite: isFavorite(values.folder),
      data: {
        title: values.title,
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
              selectedRecord=${RECORD_TYPES.NOTE}
              onRecordSelect=${(record) => onTypeChange(record?.type)}
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
          <${TextArea}
            ...${register('note')}
            placeholder=${i18n._('Write a note...')}
          />
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
