import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  EmailIcon,
  InputField,
  PhoneIcon,
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
 *    data: {
 *     title: string
 *     fullName: string
 *     email: string
 *     phoneNumber: string
 *     address: string
 *     zip: string
 *     city: string
 *     region: string
 *     country: string
 *     note: string
 *     customFields: {
 *       note: string
 *       type: string
 *     }[]
 *   }
 *  }
 *  selectedFolder?: string
 * }} props
 */
export const IdentityDetailsForm = ({ initialRecord, selectedFolder }) => {
  const { i18n } = useLingui()

  const { register, registerArray } = useForm({
    initialValues: {
      title: initialRecord?.data?.title ?? '',
      fullName: initialRecord?.data?.fullName ?? '',
      email: initialRecord?.data?.email ?? '',
      phoneNumber: initialRecord?.data?.phoneNumber ?? '',
      address: initialRecord?.data?.address ?? '',
      zip: initialRecord?.data?.zip ?? '',
      city: initialRecord?.data?.city ?? '',
      region: initialRecord?.data?.region ?? '',
      country: initialRecord?.data?.country ?? '',
      note: initialRecord?.data?.note ?? '',
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

      <${FormGroup} title=${i18n._('Personal information')} isCollapse>
        <${InputField}
          label=${i18n._('Full name')}
          placeholder=${i18n._('Full name')}
          variant="outline"
          icon=${UserIcon}
          isDisabled
          ...${register('fullname')}
        />

        <${InputField}
          label=${i18n._('Email')}
          placeholder=${i18n._('Insert email')}
          variant="outline"
          icon=${EmailIcon}
          isDisabled
          ...${register('email')}
        />

        <${InputField}
          label=${i18n._('Phone number ')}
          placeholder=${i18n._('Phone number ')}
          variant="outline"
          icon=${PhoneIcon}
          isDisabled
          ...${register('phoneNumber')}
        />
      <//>

      <${FormGroup} title=${i18n._('Detail of address')} isCollapse>
        <${InputField}
          label=${i18n._('Address')}
          placeholder=${i18n._('Address')}
          variant="outline"
          isDisabled
          ...${register('address')}
        />

        <${InputField}
          label=${i18n._('ZIP')}
          placeholder=${i18n._('Insert zip')}
          variant="outline"
          isDisabled
          ...${register('zip')}
        />

        <${InputField}
          label=${i18n._('City')}
          placeholder=${i18n._('City')}
          variant="outline"
          isDisabled
          ...${register('city')}
        />

        <${InputField}
          label=${i18n._('Region')}
          placeholder=${i18n._('Region')}
          variant="outline"
          isDisabled
          ...${register('region')}
        />

        <${InputField}
          label=${i18n._('Country')}
          placeholder=${i18n._('Country')}
          variant="outline"
          isDisabled
          ...${register('country')}
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
