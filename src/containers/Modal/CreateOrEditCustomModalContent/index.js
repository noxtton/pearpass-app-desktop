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
import { LoadingOverlay } from '../../../components/LoadingOverlay'
import { useModal } from '../../../context/ModalContext'
import { useForm } from '../../../hooks/useForm'
import { Validator } from '../../../utils/validator'
import { useCreateRecord } from '../../../vault/hooks/useCreateRecord'
import { useUpdateRecord } from '../../../vault/hooks/useUpdateRecord'
import { CustomFields } from '../../CustomFields'
import { ModalContent } from '../ModalContent'

/**
 *
 * @param {{
 *  initialRecord: {
 *    data: {
 *      title: string
 *      customFields: {
 *          note: string
 *          type: string
 *     }[]
 *   }
 *  }
 *  selectedFolder?: string
 * }} props
 * @returns
 */
export const CreateOrEditCustomModalContent = ({
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
    customFields: Validator.array().items(
      Validator.object({
        note: Validator.string().required(i18n._('Note is required'))
      })
    ),
    folder: Validator.string()
  })

  const { register, handleSubmit, registerArray, values, setValue } = useForm({
    initialValues: {
      title: initialRecord?.data?.title || '',
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
      type: 'custom',
      folder: values.folder,
      data: {
        title: values.title,
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
              startIcon=${SaveIcon}
              onClick=${handleSubmit(onSubmit)}
            >
              ${i18n._('Custom')}
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
