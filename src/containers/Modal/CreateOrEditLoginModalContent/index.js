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
  WorldIcon
} from 'pearpass-lib-ui-react-components'

import { CreateCustomField } from '../../../components/CreateCustomField'
import { FolderDropdown } from '../../../components/FolderDropdown'
import { FormGroup } from '../../../components/FormGroup'
import { FormModalHeaderWrapper } from '../../../components/FormModalHeaderWrapper'
import { FormWrapper } from '../../../components/FormWrapper'
import { InputFieldNote } from '../../../components/InputFieldNote'
import { useModal } from '../../../context/ModalContext'
import { useCreateOrEditRecord } from '../../../hooks/useCreateOrEditRecord'
import { useCustomFields } from '../../../hooks/useCustomFields'
import { CustomFields } from '../../CustomFields'
import { ModalContent } from '../ModalContent'

export const CreateOrEditLoginModalContent = () => {
  const { i18n } = useLingui()
  const { closeModal } = useModal()
  const { customFields, createCustomField } = useCustomFields()

  const { handleCreateOrEditRecord } = useCreateOrEditRecord()

  return html`
    <${ModalContent}
      onClose=${closeModal}
      headerChildren=${html`
        <${FormModalHeaderWrapper}
          buttons=${html`
            <${ButtonLittle} startIcon=${SaveIcon}> ${i18n._('Login')} <//>
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
          />
        <//>

        <${FormGroup}>
          <${InputField}
            label=${i18n._('Email or username')}
            placeholder=${i18n._('Email or username')}
            variant="outline"
            icon=${UserIcon}
          />

          <${InputField}
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
          />

          <${InputField}
            label=${i18n._('Secret key (2FA)')}
            placeholder=${i18n._('Insert code')}
            variant="outline"
            icon=${LockIcon}
          />
        <//>

        <${CompoundField}>
          <${InputField}
            label=${i18n._('Website')}
            placeholder=${i18n._('https://')}
            icon=${WorldIcon}
            additionalItems=${html`
              <${ButtonSingleInput} startIcon=${PlusIcon}>
                ${i18n._('Add website')}
              <//>
            `}
          />

          <${InputField}
            label=${i18n._('Website')}
            placeholder=${i18n._('https://')}
            icon=${WorldIcon}
            additionalItems=${html`
              <${ButtonSingleInput} startIcon=${DeleteIcon}>
                ${i18n._('Delete')}
              <//>
            `}
          />
        <//>

        <${FormGroup}>
          <${InputFieldNote} />
        <//>

        <${CustomFields} customFields=${customFields} />

        <${FormGroup}>
          <${CreateCustomField} onCreateCustom=${createCustomField} />
        <//>
      <//>
    <//>
  `
}
