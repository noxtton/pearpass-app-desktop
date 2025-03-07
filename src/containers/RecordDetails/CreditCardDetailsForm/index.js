import React, { useEffect } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useForm } from 'pear-apps-lib-ui-react-hooks'
import {
  CalendarIcon,
  CreditCardIcon,
  InputField,
  NineDotsIcon,
  UserIcon
} from 'pearpass-lib-ui-react-components'

import { BadgeCopyClipboard } from '../../../components/BadgeCopyClipboard'
import { FormGroup } from '../../../components/FormGroup'
import { FormWrapper } from '../../../components/FormWrapper'
import { InputFieldNote } from '../../../components/InputFieldNote'
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard'
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
  const { copyToClipboard, isCopied } = useCopyToClipboard()

  const initialValues = React.useMemo(
    () => ({
      name: initialRecord?.data?.name ?? '',
      number: initialRecord?.data?.number ?? '',
      expireDate: initialRecord?.data?.expireDate ?? '',
      securityCode: initialRecord?.data?.securityCode ?? '',
      pinCode: initialRecord?.data?.pinCode ?? '',
      note: initialRecord?.data?.note ?? '',
      customFields: initialRecord?.data?.customFields ?? [],
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
      <${FormGroup}>
        <${InputField}
          label=${i18n._('Full name')}
          placeholder=${i18n._('Full name')}
          variant="outline"
          icon=${UserIcon}
          onClick=${handleCopy}
          isDisabled
          ...${register('name')}
        />

        <${InputField}
          label=${i18n._('Number on card')}
          placeholder="1234 1234 1234 1234 "
          variant="outline"
          icon=${CreditCardIcon}
          onClick=${handleCopy}
          isDisabled
          ...${register('number')}
        />

        <${InputField}
          label=${i18n._('Date of expire')}
          placeholder="MM/AA"
          variant="outline"
          icon=${CalendarIcon}
          onClick=${handleCopy}
          isDisabled
          ...${register('expireDate')}
        />

        <${InputField}
          label=${i18n._('Security code')}
          placeholder="123"
          variant="outline"
          icon=${CreditCardIcon}
          onClick=${handleCopy}
          isDisabled
          ...${register('securityCode')}
        />

        <${InputField}
          label=${i18n._('Pin code')}
          placeholder="1234"
          variant="outline"
          icon=${NineDotsIcon}
          onClick=${handleCopy}
          isDisabled
          ...${register('pinCode')}
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
      <${BadgeCopyClipboard} isCopied=${isCopied} />
    <//>
  `
}
