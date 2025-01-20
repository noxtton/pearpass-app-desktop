import React from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  CompoundField,
  InputField,
  KeyIcon,
  PasswordField,
  UserIcon,
  WorldIcon
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

  const { register, registerArray } = useForm({
    initialValues: {
      title: initialRecord?.data?.title ?? '',
      username: initialRecord?.data?.username ?? '',
      password: initialRecord?.data?.password ?? '',
      note: initialRecord?.data?.note ?? '',
      websites: initialRecord?.data?.websites?.length
        ? initialRecord?.data?.websites.map((website) => ({ website }))
        : [{ name: 'website' }],
      customFields: initialRecord?.data.customFields ?? [],
      folder: selectedFolder ?? initialRecord?.folder
    }
  })

  const { value: websitesList, registerItem } = registerArray('websites')

  const { value: customFieldsList, registerItem: registerCustomFieldItem } =
    registerArray('customFields')

  const handleWebsiteClick = (url) => {
    window.open(url, '_blank')
  }

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
          label=${i18n._('Email or username')}
          placeholder=${i18n._('Email or username')}
          variant="outline"
          icon=${UserIcon}
          isDisabled
          ...${register('username')}
        />

        <${PasswordField}
          label=${i18n._('Password')}
          placeholder=${i18n._('Password')}
          variant="outline"
          icon=${KeyIcon}
          isDisabled
          ...${register('password')}
        />
      <//>

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

      <${FormGroup}>
        <${InputFieldNote} ...${register('note')} isDisabled />
      <//>

      <${CustomFields}
        customFields=${customFieldsList}
        register=${registerCustomFieldItem}
        areInputsDisabled=${true}
      />
    <//>
  `
}
