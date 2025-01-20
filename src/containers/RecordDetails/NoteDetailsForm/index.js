import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { InputField, TextArea } from 'pearpass-lib-ui-react-components'

import { FormGroup } from '../../../components/FormGroup'
import { FormWrapper } from '../../../components/FormWrapper'
import { useForm } from '../../../hooks/useForm'
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
 *     }
 *    }
 *  selectedFolder?: string
 * }} props
 */
export const NoteDetailsForm = ({ initialRecord, selectedFolder }) => {
  const { i18n } = useLingui()

  const { register, registerArray } = useForm({
    initialValues: {
      title: initialRecord?.data?.title ?? '',
      note: initialRecord?.data?.note ?? '',
      customFields: initialRecord?.data?.customFields ?? [],
      folder: selectedFolder ?? initialRecord?.folder
    }
  })

  const { value: list, registerItem } = registerArray('customFields')

  return html`
    <${FormWrapper}>
      <${FormGroup}>
        <${InputField}
          label=${i18n._('Title')}
          placeholder=${i18n._('Insert title')}
          variant="outline"
          isDisabled
          ...${register('title')}
        />
      <//>

      <${FormGroup}>
        <${TextArea}
          ...${register('note')}
          placeholder=${i18n._('Write a note...')}
          isDisabled
        />
      <//>

      <${CustomFields}
        areInputsDisabled=${true}
        customFields=${list}
        register=${registerItem}
      />
    <//>
  `
}
