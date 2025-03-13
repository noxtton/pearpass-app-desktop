import React, { useEffect } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useForm } from 'pear-apps-lib-ui-react-hooks'
import {
  CopyIcon,
  EmailIcon,
  InputField,
  PhoneIcon,
  UserIcon
} from 'pearpass-lib-ui-react-components'

import { FormGroup } from '../../../components/FormGroup'
import { FormWrapper } from '../../../components/FormWrapper'
import { InputFieldNote } from '../../../components/InputFieldNote'
import { useToast } from '../../../context/ToastContext'
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard'
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
    }),
    [initialRecord, selectedFolder]
  )

  const { register, registerArray, setValues } = useForm({
    initialValues: initialValues
  })

  const { value: list, registerItem } = registerArray('customFields')

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
      <${FormGroup} title=${i18n._('Personal information')} isCollapse>
        <${InputField}
          label=${i18n._('Full name')}
          placeholder=${i18n._('Full name')}
          variant="outline"
          icon=${UserIcon}
          onClick=${handleCopy}
          isDisabled
          ...${register('fullname')}
        />

        <${InputField}
          label=${i18n._('Email')}
          placeholder=${i18n._('Insert email')}
          variant="outline"
          icon=${EmailIcon}
          onClick=${handleCopy}
          isDisabled
          ...${register('email')}
        />

        <${InputField}
          label=${i18n._('Phone number ')}
          placeholder=${i18n._('Phone number ')}
          variant="outline"
          icon=${PhoneIcon}
          onClick=${handleCopy}
          isDisabled
          ...${register('phoneNumber')}
        />
      <//>

      <${FormGroup} title=${i18n._('Detail of address')} isCollapse>
        <${InputField}
          label=${i18n._('Address')}
          placeholder=${i18n._('Address')}
          variant="outline"
          onClick=${handleCopy}
          isDisabled
          ...${register('address')}
        />

        <${InputField}
          label=${i18n._('ZIP')}
          placeholder=${i18n._('Insert zip')}
          variant="outline"
          onClick=${handleCopy}
          isDisabled
          ...${register('zip')}
        />

        <${InputField}
          label=${i18n._('City')}
          placeholder=${i18n._('City')}
          variant="outline"
          onClick=${handleCopy}
          isDisabled
          ...${register('city')}
        />

        <${InputField}
          label=${i18n._('Region')}
          placeholder=${i18n._('Region')}
          variant="outline"
          onClick=${handleCopy}
          isDisabled
          ...${register('region')}
        />

        <${InputField}
          label=${i18n._('Country')}
          placeholder=${i18n._('Country')}
          variant="outline"
          onClick=${handleCopy}
          isDisabled
          ...${register('country')}
        />
      <//>

      <${FormGroup}>
        <${InputFieldNote}
          onClick=${handleCopy}
          isDisabled
          ...${register('note')}
        />
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
