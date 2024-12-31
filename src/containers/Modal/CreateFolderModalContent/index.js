import { html } from 'htm/react'
import {
  InputField,
  ButtonLittle,
  FolderIcon
} from 'pearpass-lib-ui-react-components'
import { ModalContent } from '../ModalContent'
import { useLingui } from '@lingui/react'
import { useModal } from '../../../context/ModalContext'
import { HeaderWrapper } from './styles'

export const CreateFolderModalContent = () => {
  const { i18n } = useLingui()
  const { closeModal } = useModal()

  return html`
    <${ModalContent}
      onClose=${closeModal}
      headerChildren=${html`
        <${HeaderWrapper}>
          <${ButtonLittle} leftIcon=${FolderIcon}>
            ${i18n._('Create folder')}
          <//>
        <//>
      `}
    >
      <${InputField}
        label=${i18n._('Title')}
        placeholder=${i18n._('Insert folder name')}
        variant="outline"
      />
    <//>
  `
}
