import React, { useEffect } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useForm } from 'pear-apps-lib-ui-react-hooks'
import { CopyIcon, TextArea } from 'pearpass-lib-ui-react-components'

import { FormGroup } from '../../../components/FormGroup'
import { FormWrapper } from '../../../components/FormWrapper'
import { ATTACHMENT_FIELD_KEY } from '../../../constants/formFields'
import { useToast } from '../../../context/ToastContext'
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard'
import { useGetMultipleFiles } from '../../../hooks/useGetMultipleFiles'
import { CustomFields } from '../../CustomFields'

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
 *    attachments: { id: string, name: string}[]
 *     }
 *    }
 *  selectedFolder?: string
 * }} props
 */
export const NoteDetailsForm = ({ initialRecord, selectedFolder }) => {
  const { i18n } = useLingui()

  const { setToast } = useToast()

  const { copyToClipboard } = useCopyToClipboard({
    onCopy: () => {
      setToast({
        message: i18n._('Copied to clipboard'),
        icon: CopyIcon
      })
    }
  })

  const initialValues = React.useMemo(
    () => ({
      note: initialRecord?.data?.note ?? '',
      customFields: initialRecord?.data?.customFields ?? [],
      folder: selectedFolder ?? initialRecord?.folder,
      attachments: initialRecord?.attachments ?? []
    }),
    [initialRecord, selectedFolder]
  )

  const { register, registerArray, setValues, values, setValue } = useForm({
    initialValues: initialValues
  })

  const { value: list, registerItem } = registerArray('customFields')

  useGetMultipleFiles({
    fieldNames: [ATTACHMENT_FIELD_KEY],
    updateValues: setValue,
    initialRecord
  })

  const handleCopy = (value) => {
    if (!value?.length) {
      return
    }

    copyToClipboard(value)
  }

  useEffect(() => {
    setValues(initialValues)
  }, [initialValues, setValues])

  return html`
    <${FormWrapper}>
      <${FormGroup}>
        ${!!values?.note?.length &&
        html`
          <${TextArea}
            ...${register('note')}
            placeholder=${i18n._('Write a note...')}
            onClick=${handleCopy}
            isDisabled
          />
        `}
      <//>

      <${CustomFields}
        areInputsDisabled=${true}
        customFields=${list}
        onClick=${handleCopy}
        register=${registerItem}
      />
    <//>
  `
}
