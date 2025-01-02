import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  InputField,
  ButtonLittle,
  SaveIcon,
  UserIcon,
  CommonFileIcon,
  ImageIcon,
  EmailIcon,
  PhoneIcon
} from 'pearpass-lib-ui-react-components'

import { CreateCustomField } from '../../../components/CreateCustomField'
import { FolderDropdown } from '../../../components/FolderDropdown'
import { FormGroup } from '../../../components/FormGroup'
import { FormModalHeaderWrapper } from '../../../components/FormModalHeaderWrapper'
import { FormWrapper } from '../../../components/FormWrapper'
import { useModal } from '../../../context/ModalContext'
import { ModalContent } from '../ModalContent'

export const CreateOrEditIdentityModalContent = () => {
  const { i18n } = useLingui()
  const { closeModal } = useModal()

  return html`
    <${ModalContent}
      onClose=${closeModal}
      headerChildren=${html`
        <${FormModalHeaderWrapper}>
          <${FolderDropdown} />

          <${ButtonLittle} leftIcon=${ImageIcon}> ${i18n._('Load picture')} <//>

          <${ButtonLittle} leftIcon=${SaveIcon}> ${i18n._('Identity')} <//>
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

        <${FormGroup} title=${i18n._('Personal information')} isCollapse>
          <${InputField}
            label=${i18n._('Full name')}
            placeholder=${i18n._('Full name')}
            variant="outline"
            icon=${UserIcon}
          />

          <${InputField}
            label=${i18n._('Email')}
            placeholder=${i18n._('Insert email')}
            variant="outline"
            icon=${EmailIcon}
          />

          <${InputField}
            label=${i18n._('Phone number ')}
            placeholder=${i18n._('Phone number ')}
            variant="outline"
            icon=${PhoneIcon}
          />
        <//>

        <${FormGroup} title=${i18n._('Detail of address')} isCollapse>
          <${InputField}
            label=${i18n._('Address')}
            placeholder=${i18n._('Address')}
            variant="outline"
          />

          <${InputField}
            label=${i18n._('CAP')}
            placeholder=${i18n._('Inser cap')}
            variant="outline"
          />

          <${InputField}
            label=${i18n._('City')}
            placeholder=${i18n._('City')}
            variant="outline"
          />

          <${InputField}
            label=${i18n._('Region')}
            placeholder=${i18n._('Region')}
            variant="outline"
          />

          <${InputField}
            label=${i18n._('Country')}
            placeholder=${i18n._('Country')}
            variant="outline"
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
