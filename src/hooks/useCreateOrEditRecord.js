import { html } from 'htm/react'

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
  }

  const handleCreateOrEditRecord = ({ recordType }) => {
    setModal(getModalCOntentByRecordType({ recordType }))
  }

  return {
    handleCreateOrEditRecord
  }
}
