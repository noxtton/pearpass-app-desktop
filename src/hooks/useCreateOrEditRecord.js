import { html } from 'htm/react'

import { CreateOrEditCreditCardModalContent } from '../containers/Modal/CreateOrEditCreditCardModalContent'
import { CreateOrEditLoginModalContent } from '../containers/Modal/CreateOrEditLoginModalContent'
import { useModal } from '../context/ModalContext'

/**
 * @returns {{
 *  handleCreateOrEditRecord: () => void
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
  }

  const handleCreateOrEditRecord = ({ recordType }) => {
    setModal(getModalCOntentByRecordType({ recordType }))
  }

  return {
    handleCreateOrEditRecord
  }
}
