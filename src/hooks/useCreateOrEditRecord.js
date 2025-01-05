import { html } from 'htm/react'

import { CreateOrEditCreditCardModalContent } from '../containers/Modal/CreateOrEditCreditCardModalContent'
import { CreateOrEditCustomModalContent } from '../containers/Modal/CreateOrEditCustomModalContent'
import { CreateOrEditIdentityModalContent } from '../containers/Modal/CreateOrEditIdentityModalContent'
import { CreateOrEditLoginModalContent } from '../containers/Modal/CreateOrEditLoginModalContent'
import { CreateOrEditNoteModalContent } from '../containers/Modal/CreateOrEditNoteModalContent'
import { useModal } from '../context/ModalContext'

/**
 * @returns {{
 *  handleCreateOrEditRecord: ({
 *    recordType: 'login' | 'creditCard' | 'identity' | 'note' | 'custom'
 *  }) => void
 * }}
 */
export const useCreateOrEditRecord = () => {
  const { setModal } = useModal()

  const getModalCOntentByRecordType = ({ recordType }) => {
    if (recordType === 'login') {
      return html`<${CreateOrEditLoginModalContent} />`
    }

    if (recordType === 'creditCard') {
      return html`<${CreateOrEditCreditCardModalContent} />`
    }

    if (recordType === 'identity') {
      return html`<${CreateOrEditIdentityModalContent} />`
    }

    if (recordType === 'note') {
      return html`<${CreateOrEditNoteModalContent} />`
    }

    if (recordType === 'custom') {
      return html`<${CreateOrEditCustomModalContent} />`
    }
  }

  const handleCreateOrEditRecord = ({ recordType }) => {
    if (recordType === 'password') {
      setModal(html`<div>password</div>`, {
        modalType: 'sideDrawer'
      })
      return
    }

    setModal(getModalCOntentByRecordType({ recordType }))
  }

  return {
    handleCreateOrEditRecord
  }
}
