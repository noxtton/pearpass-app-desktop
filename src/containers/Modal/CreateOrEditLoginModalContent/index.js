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
  CommonFileIcon
} from 'pearpass-lib-ui-react-components'

import { CreateCustomField } from '../../../components/CreateCustomField'
import { FolderDropdown } from '../../../components/FolderDropdown'
import { FormGroup } from '../../../components/FormGroup'
import { FormModalHeaderWrapper } from '../../../components/FormModalHeaderWrapper'
import { FormWrapper } from '../../../components/FormWrapper'
import { useModal } from '../../../context/ModalContext'
import { ModalContent } from '../ModalContent'

export const CreateOrEditLoginModalContent = () => {
  const { i18n } = useLingui()
  const { closeModal } = useModal()

  return html`
    <${ModalContent}
      onClose=${closeModal}
      headerChildren=${html`
        <${FormModalHeaderWrapper}>
          <${FolderDropdown} />

          <${ButtonLittle} leftIcon=${SaveIcon}> ${i18n._('Login')} <//>
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
              <${ButtonSingleInput} leftIcon=${PasswordIcon} />
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
              <${ButtonSingleInput} leftIcon=${PlusIcon}>
                ${i18n._('Add website')}
              <//>
            `}
          />

          <${InputField}
            label=${i18n._('Website')}
            placeholder=${i18n._('https://')}
            icon=${WorldIcon}
            additionalItems=${html`
              <${ButtonSingleInput} leftIcon=${DeleteIcon}>
                ${i18n._('Delete')}
              <//>
            `}
          />
        <//>

        <${FormGroup}>
          <${InputField}
            label=${i18n._('Note')}
            placeholder=${i18n._('Add note')}
            variant="outline"
            icon=${CommonFileIcon}
          />
        <//>

        <${FormGroup}>
          <${CreateCustomField} onCreateCustom=${() => {}} />
        <//>
      <//>
    <//>
  `
}
