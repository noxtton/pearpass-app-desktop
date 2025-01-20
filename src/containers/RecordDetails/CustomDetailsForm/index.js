import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { InputField } from 'pearpass-lib-ui-react-components'

import { FormGroup } from '../../../components/FormGroup'
import { FormWrapper } from '../../../components/FormWrapper'
import { useForm } from '../../../hooks/useForm'
import { CustomFields } from '../../CustomFields'

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
export const CustomDetailsForm = ({ initialRecord, selectedFolder }) => {
  const { i18n } = useLingui()

  const { register, registerArray } = useForm({
    initialValues: {
      title: initialRecord?.data?.title || '',
      customFields: initialRecord?.data?.customFields || [],
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

      <${CustomFields}
        areInputsDisabled=${true}
        customFields=${list}
        register=${registerItem}
      />
    <//>
  `
}
