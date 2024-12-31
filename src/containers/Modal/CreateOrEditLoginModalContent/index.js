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
import { ModalContent } from '../ModalContent'
import { useLingui } from '@lingui/react'
import { useModal } from '../../../context/ModalContext'
import { FormWrapper, HeaderWrapper } from './styles'
import { FolderDropdown } from '../../../components/FolderDropdown'

export const CreateOrEditLoginModalContent = () => {
  const { i18n } = useLingui()
  const { closeModal } = useModal()

  return html`
    <${ModalContent}
      onClose=${closeModal}
      headerChildren=${html`
        <${HeaderWrapper}>
          <${FolderDropdown} />

          <${ButtonLittle} leftIcon=${SaveIcon}> ${i18n._('Login')} <//>
        <//>
      `}
    >
      <${FormWrapper}>
        <div>
          <${InputField}
            label=${i18n._('Title')}
            placeholder=${i18n._('Insert title')}
            variant="outline"
          />
        </div>

        <div>
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
        </div>

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

        <div>
          <${InputField}
            label=${i18n._('Note')}
            placeholder=${i18n._('Add note')}
            variant="outline"
            icon=${CommonFileIcon}
          />
        </div>
      <//>
    <//>
  `
}
