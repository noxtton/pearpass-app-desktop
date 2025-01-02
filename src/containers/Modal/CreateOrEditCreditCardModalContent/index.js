import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  InputField,
  ButtonLittle,
  SaveIcon,
  UserIcon,
  CommonFileIcon,
  CreditCardIcon,
  CalendarIcon,
  NineDotsIcon
} from 'pearpass-lib-ui-react-components'

import { CreateCustomField } from '../../../components/CreateCustomField'
import { FolderDropdown } from '../../../components/FolderDropdown'
import { FormModalHeaderWrapper } from '../../../components/FormModalHeaderWrapper'
import { FormWrapper } from '../../../components/FormWrapper'
import { useModal } from '../../../context/ModalContext'
import { ModalContent } from '../ModalContent'

export const CreateOrEditCreditCardModalContent = () => {
  const { i18n } = useLingui()
  const { closeModal } = useModal()

  return html`
    <${ModalContent}
      onClose=${closeModal}
      headerChildren=${html`
        <${FormModalHeaderWrapper}>
          <${FolderDropdown} />

          <${ButtonLittle} leftIcon=${SaveIcon}> ${i18n._('Credit card')} <//>
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
            label=${i18n._('Full name')}
            placeholder=${i18n._('Full name')}
            variant="outline"
            icon=${UserIcon}
          />

          <${InputField}
            label=${i18n._('Number on card')}
            placeholder="1234 1234 1234 1234 "
            variant="outline"
            icon=${CreditCardIcon}
          />

          <${InputField}
            label=${i18n._('Date of expire')}
            placeholder="MM/AA"
            variant="outline"
            icon=${CalendarIcon}
          />

          <${InputField}
            label=${i18n._('Security code')}
            placeholder="123"
            variant="outline"
            icon=${CreditCardIcon}
          />

          <${InputField}
            label=${i18n._('Pin code')}
            placeholder="1234"
            variant="outline"
            icon=${NineDotsIcon}
          />
        </div>

        <div>
          <${InputField}
            label=${i18n._('Note')}
            placeholder=${i18n._('Add note')}
            variant="outline"
            icon=${CommonFileIcon}
          />
        </div>

        <div>
          <${CreateCustomField} onCreateCustom=${() => {}} />
        </div>
      <//>
    <//>
  `
}
