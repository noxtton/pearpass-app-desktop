import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  CalendarIcon,
  CreditCardIcon,
  InputField,
  NineDotsIcon,
  UserIcon
} from 'pearpass-lib-ui-react-components'

import { FormGroup } from '../../../components/FormGroup'
import { FormWrapper } from '../../../components/FormWrapper'
import { InputFieldNote } from '../../../components/InputFieldNote'
import { useForm } from '../../../hooks/useForm'
import { CustomFields } from '../../CustomFields'

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
 * }} props
 */
export const CreditCardDetailsForm = ({ initialRecord, selectedFolder }) => {
  const { i18n } = useLingui()

  const { register, registerArray } = useForm({
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
        <${InputField}
          label=${i18n._('Full name')}
          placeholder=${i18n._('Full name')}
          variant="outline"
          icon=${UserIcon}
          isDisabled
          ...${register('name')}
        />

        <${InputField}
          label=${i18n._('Number on card')}
          placeholder="1234 1234 1234 1234 "
          variant="outline"
          icon=${CreditCardIcon}
          isDisabled
          ...${register('number')}
        />

        <${InputField}
          label=${i18n._('Date of expire')}
          placeholder="MM/AA"
          variant="outline"
          icon=${CalendarIcon}
          isDisabled
          ...${register('expireDate')}
        />

        <${InputField}
          label=${i18n._('Security code')}
          placeholder="123"
          variant="outline"
          icon=${CreditCardIcon}
          isDisabled
          ...${register('securityCode')}
        />

        <${InputField}
          label=${i18n._('Pin code')}
          placeholder="1234"
          variant="outline"
          icon=${NineDotsIcon}
          isDisabled
          ...${register('pinCode')}
        />
      <//>

      <${FormGroup}>
        <${InputFieldNote} isDisabled ...${register('note')} />
      <//>

      <${CustomFields}
        areInputsDisabled=${true}
        customFields=${list}
        register=${registerItem}
      />
    <//>
  `
}
