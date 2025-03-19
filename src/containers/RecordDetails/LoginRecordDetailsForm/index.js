import React, { useEffect } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useForm } from 'pear-apps-lib-ui-react-hooks'
import {
  CompoundField,
  CopyIcon,
  InputField,
  KeyIcon,
  PasswordField,
  UserIcon,
  WorldIcon
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
 *   data: {
 *    title: string
 *    username: string
 *    password: string
 *    note: string
 *    websites: string[]
 *    customFields: {
 *        type: string
 *        name: string
 *     }[]
 *    }
 *  }
 *  selectedFolder?: string
 * }} props
 */
export const LoginRecordDetailsForm = ({ initialRecord, selectedFolder }) => {
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
      username: initialRecord?.data?.username ?? '',
      password: initialRecord?.data?.password ?? '',
      note: initialRecord?.data?.note ?? '',
      websites: initialRecord?.data?.websites?.length
        ? initialRecord?.data?.websites.map((website) => ({ website }))
        : [{ name: 'website' }],
      customFields: initialRecord?.data.customFields ?? [],
      folder: selectedFolder ?? initialRecord?.folder
    }),
    [initialRecord, selectedFolder]
  )

  const { register, registerArray, setValues, values } = useForm({
    initialValues: initialValues
  })

  const { value: websitesList, registerItem } = registerArray('websites')

  const { value: customFieldsList, registerItem: registerCustomFieldItem } =
    registerArray('customFields')

  const handleWebsiteClick = (url) => {
    if (!url?.length) {
      return
    }

    window.open(url, '_blank')
  }

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
        ${!!values?.username?.length &&
        html`
          <${InputField}
            label=${i18n._('Email or username')}
            placeholder=${i18n._('Email or username')}
            variant="outline"
            icon=${UserIcon}
            onClick=${handleCopy}
            isDisabled
            ...${register('username')}
          />
        `}
        ${!!values?.password?.length &&
        html`
          <${PasswordField}
            label=${i18n._('Password')}
            placeholder=${i18n._('Password')}
            variant="outline"
            icon=${KeyIcon}
            onClick=${handleCopy}
            isDisabled
            ...${register('password')}
          />
        `}
      <//>

      ${!!values?.websites?.length &&
      html`
        <${CompoundField}>
          ${websitesList.map((website, index) => {
            return html`
              <${React.Fragment} key=${website.id}>
                <${InputField}
                  label=${i18n._('Website')}
                  placeholder=${i18n._('https://')}
                  icon=${WorldIcon}
                  ...${registerItem('website', index)}
                  isDisabled
                  onClick=${() =>
                    handleWebsiteClick(registerItem('website', index).value)}
                />
              <//>
            `
          })}
        <//>
      `}

      <${FormGroup}>
        ${!!values?.note?.length &&
        html`
          <${InputFieldNote}
            ...${register('note')}
            onClick=${handleCopy}
            isDisabled
          />
        `}
      <//>

      <${CustomFields}
        customFields=${customFieldsList}
        onClick=${handleCopy}
        register=${registerCustomFieldItem}
        areInputsDisabled=${true}
      />
    <//>
  `
}
