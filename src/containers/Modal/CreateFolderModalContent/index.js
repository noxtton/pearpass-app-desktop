import React from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useForm } from 'pearpass-lib-form'
import {
  InputField,
  ButtonLittle,
  FolderIcon
} from 'pearpass-lib-ui-react-components'
import { Validator } from 'pearpass-lib-validator'
import { useCreateFolder, useFolders } from 'pearpass-lib-vault-desktop'

import { LoadingOverlay } from '../../../components/LoadingOverlay'
import { useModal } from '../../../context/ModalContext'
import { ModalContent } from '../ModalContent'
import { HeaderWrapper } from './styles'

/**
 * @param {{
 *  onCreate: (folderName: string) => void
 * }} props
 */
export const CreateFolderModalContent = ({ onCreate }) => {
  const { i18n } = useLingui()
  const { closeModal } = useModal()

  const { isLoading, createFolder } = useCreateFolder({
    onCompleted: (folderName) => {
      onCreate?.(folderName)

      closeModal()
    }
  })

  const { data } = useFolders()

  const customFolders = Object.values(data?.customFolders ?? {})

  const schema = Validator.object({
    title: Validator.string()
      .required(i18n._('Title is required'))
      .refine((value) => {
        const isDuplicate = customFolders.some(
          (folder) => folder.name === value
        )

        if (isDuplicate) {
          return i18n._('Folder already exists')
        }

        return null
      })
  })

  const { register, handleSubmit } = useForm({
    initialValues: {
      title: ''
    },
    validate: (values) => {
      return schema.validate(values)
    }
  })

  const onSubmit = (values) => {
    createFolder(values.title)
  }

  return html`
    <${React.Fragment}>
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

      ${isLoading && html`<${LoadingOverlay} />`}
    <//>
  `
}
