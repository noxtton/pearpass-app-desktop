import React, { useEffect } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  InputField,
  ButtonLittle,
  SaveIcon,
  CompoundField,
  UserIcon,
  KeyIcon,
  LockIcon,
  ButtonSingleInput,
  PasswordIcon,
  PlusIcon,
  DeleteIcon,
  WorldIcon,
  PasswordField
} from 'pearpass-lib-ui-react-components'

import { CreateCustomField } from '../../../components/CreateCustomField'
import { FolderDropdown } from '../../../components/FolderDropdown'
import { FormGroup } from '../../../components/FormGroup'
import { FormModalHeaderWrapper } from '../../../components/FormModalHeaderWrapper'
import { FormWrapper } from '../../../components/FormWrapper'
import { InputFieldNote } from '../../../components/InputFieldNote'
import { useModal } from '../../../context/ModalContext'
import { useCreateOrEditRecord } from '../../../hooks/useCreateOrEditRecord'
import { useForm } from '../../../hooks/useForm'
import { Validator } from '../../../utils/validator'
import { CustomFields } from '../../CustomFields'
import { ModalContent } from '../ModalContent'

export const CreateOrEditLoginModalContent = () => {
  const { i18n } = useLingui()
  const { closeModal } = useModal()
  const { handleCreateOrEditRecord } = useCreateOrEditRecord()

  const schema = Validator.object({
    title: Validator.string().required(i18n._('Title is required')),
    emailOrUsername: Validator.string(),
    password: Validator.string(),
    secretKey: Validator.string(),
    note: Validator.string(),
    websites: Validator.array().items(
      Validator.object({
        website: Validator.string().required(i18n._('Website is required'))
      })
    ),
    customFields: Validator.array().items(
      Validator.object({
        note: Validator.string().required(i18n._('Note is required'))
      })
    )
  })

  const form = useForm({
    initialValues: {
      title: '',
      emailOrUsername: '',
      password: '',
      secretKey: '',
      note: ''
    },
    validate: (values) => {
      return schema.validate(values)
    }
  })

  const { hasErrors, register, handleSubmit, registerArray } = form

  const {
    value: list,
    addItem,
    registerItem,
    removeItem
  } = registerArray('websites')

  const {
    value: customFieldsList,
    addItem: addCustomField,
    registerItem: registerCustomFieldItem
  } = registerArray('customFields')

  const onSubmit = () => {
    if (!hasErrors) {
      closeModal()
    }
  }

  useEffect(() => {
    addItem({ name: 'website' })
  }, [])

  return html`
    <${ModalContent}
      onClose=${closeModal}
      headerChildren=${html`
        <${FormModalHeaderWrapper}
          buttons=${html`
            <${ButtonLittle}
              startIcon=${SaveIcon}
              onClick=${handleSubmit(onSubmit)}
            >
              ${i18n._('Login')}
            <//>
          `}
        >
          <${FolderDropdown} />
        <//>
      `}
    >
      <${FormWrapper}>
        <${FormGroup}>
          <${InputField}
            label=${i18n._('Title')}
            placeholder=${i18n._('Insert title')}
            variant="outline"
            ...${register('title')}
          />
        <//>

        <${FormGroup}>
          <${InputField}
            label=${i18n._('Email or username')}
            placeholder=${i18n._('Email or username')}
            variant="outline"
            icon=${UserIcon}
            ...${register('emailOrUsername')}
          />

          <${PasswordField}
            label=${i18n._('Password')}
            placeholder=${i18n._('Password')}
            variant="outline"
            icon=${KeyIcon}
            additionalItems=${html`
              <${ButtonSingleInput}
                startIcon=${PasswordIcon}
                onClick=${() =>
                  handleCreateOrEditRecord({ recordType: 'password' })}
              />
            `}
            ...${register('password')}
          />

          <${InputField}
            label=${i18n._('Secret key (2FA)')}
            placeholder=${i18n._('Insert code')}
            variant="outline"
            icon=${LockIcon}
            ...${register('secretKey')}
          />
        <//>

        <${CompoundField}>
          ${list.map((website, index) => {
            return html`
              <${React.Fragment} key=${website.id}>
                <${InputField}
                  label=${i18n._('Website')}
                  placeholder=${i18n._('https://')}
                  icon=${WorldIcon}
                  ...${registerItem('website', index)}
                  additionalItems=${index === 0
                    ? html`
                        <${ButtonSingleInput}
                          startIcon=${PlusIcon}
                          onClick=${() => addItem({ name: 'website' })}
                        >
                          ${i18n._('Add website')}
                        <//>
                      `
                    : html`
                        <${ButtonSingleInput}
                          startIcon=${DeleteIcon}
                          onClick=${() => removeItem(index)}
                        >
                          ${i18n._('Remove website')}
                        <//>
                      `}
                />
              <//>
            `
          })}
        <//>

        <${FormGroup}>
          <${InputFieldNote} ...${register('note')} />
        <//>

        <${CustomFields}
          customFields=${customFieldsList}
          register=${registerCustomFieldItem}
        />

        <${FormGroup}>
          <${CreateCustomField}
            onCreateCustom=${(type) =>
              addCustomField({ type: type, name: type })}
          />
        <//>
      <//>
    <//>
  `
}
