import { html } from 'htm/react'

import { CreateOrEditCreditCardModalContent } from '../containers/Modal/CreateOrEditCreditCardModalContent'
import { CreateOrEditCustomModalContent } from '../containers/Modal/CreateOrEditCustomModalContent'
import { CreateOrEditIdentityModalContent } from '../containers/Modal/CreateOrEditIdentityModalContent'
import { CreateOrEditLoginModalContent } from '../containers/Modal/CreateOrEditLoginModalContent'
import { CreateOrEditNoteModalContent } from '../containers/Modal/CreateOrEditNoteModalContent'
import { GeneratePasswordSideDrawerContent } from '../containers/Modal/GeneratePasswordSideDrawerContent'
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

  const getModalContentByRecordType = ({
    recordType,
    initialRecord,
    selectedFolder
  }) => {
    if (recordType === 'login') {
      return html`<${CreateOrEditLoginModalContent}
        initialRecord=${initialRecord}
        selectedFolder=${selectedFolder}
      />`
    }

    if (recordType === 'creditCard') {
      return html`<${CreateOrEditCreditCardModalContent}
        initialRecord=${initialRecord}
        selectedFolder=${selectedFolder}
      />`
    }

    if (recordType === 'identity') {
      return html`<${CreateOrEditIdentityModalContent}
        initialRecord=${initialRecord}
        selectedFolder=${selectedFolder}
      />`
    }

    if (recordType === 'note') {
      return html`<${CreateOrEditNoteModalContent}
        initialRecord=${initialRecord}
        selectedFolder=${selectedFolder}
      />`
    }

    if (recordType === 'custom') {
      return html`<${CreateOrEditCustomModalContent}
        initialRecord=${initialRecord}
        selectedFolder=${selectedFolder}
      />`
    }
  }

  const getSideDrawerContentByRecordType = ({ recordType }) => {
    if (recordType === 'password') {
      return html`<${GeneratePasswordSideDrawerContent} />`
    }
  }

  const handleCreateOrEditRecord = ({
    recordType,
    initialRecord,
    selectedFolder
  }) => {
    if (recordType === 'password') {
      setModal(getSideDrawerContentByRecordType({ recordType }), {
        modalType: 'sideDrawer'
      })

      return
    }

    setModal(
      getModalContentByRecordType({ recordType, initialRecord, selectedFolder })
    )
  }

  return {
    handleCreateOrEditRecord
  }
}
