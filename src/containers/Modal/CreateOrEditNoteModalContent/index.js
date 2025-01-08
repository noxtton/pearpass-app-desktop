import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  InputField,
  ButtonLittle,
  SaveIcon,
  TextArea
} from 'pearpass-lib-ui-react-components'

import { CreateCustomField } from '../../../components/CreateCustomField'
import { FolderDropdown } from '../../../components/FolderDropdown'
import { FormGroup } from '../../../components/FormGroup'
import { FormModalHeaderWrapper } from '../../../components/FormModalHeaderWrapper'
import { FormWrapper } from '../../../components/FormWrapper'
import { useModal } from '../../../context/ModalContext'
import { useCustomFields } from '../../../hooks/useCustomFields'
import { CustomFields } from '../../CustomFields'
import { ModalContent } from '../ModalContent'

export const CreateOrEditNoteModalContent = () => {
  const { i18n } = useLingui()
  const { closeModal } = useModal()
  const { customFields, createCustomField } = useCustomFields()

  return html`
    <${ModalContent}
      onClose=${closeModal}
      headerChildren=${html`
        <${FormModalHeaderWrapper}
          buttons=${html`
            <${ButtonLittle} leftIcon=${SaveIcon}> ${i18n._('Note')} <//>
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
          <${TextArea} placeholder=${i18n._('Write a note...')} />
        <//>

        <${CustomFields} customFields=${customFields} />

        <${FormGroup}>
          <${CreateCustomField} onCreateCustom=${createCustomField} />
        <//>
      <//>
    <//>
  `
}
