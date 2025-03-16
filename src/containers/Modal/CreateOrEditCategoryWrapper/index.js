import { useState } from 'react'

import { html } from 'htm/react'

import { CreateOrEditCreditCardModalContent } from './CreateOrEditCreditCardModalContent'
import { CreateOrEditCustomModalContent } from './CreateOrEditCustomModalContent'
import { CreateOrEditIdentityModalContent } from './CreateOrEditIdentityModalContent'
import { CreateOrEditLoginModalContent } from './CreateOrEditLoginModalContent'
import { CreateOrEditNoteModalContent } from './CreateOrEditNoteModalContent'

export const CreateOrEditCategoryWrapper = ({
  initialRecord,
  selectedFolder,
  recordType
}) => {
  const [currentRecordType, setCurrentRecordType] = useState(recordType)

  if (currentRecordType === 'login') {
    return html`<${CreateOrEditLoginModalContent}
      initialRecord=${initialRecord}
      selectedFolder=${selectedFolder}
      onTypeChange=${setCurrentRecordType}
    />`
  }

  if (currentRecordType === 'creditCard') {
    return html`<${CreateOrEditCreditCardModalContent}
      initialRecord=${initialRecord}
      selectedFolder=${selectedFolder}
      onTypeChange=${setCurrentRecordType}
    />`
  }

  if (currentRecordType === 'identity') {
    return html`<${CreateOrEditIdentityModalContent}
      initialRecord=${initialRecord}
      selectedFolder=${selectedFolder}
      onTypeChange=${setCurrentRecordType}
    />`
  }

  if (currentRecordType === 'note') {
    return html`<${CreateOrEditNoteModalContent}
      initialRecord=${initialRecord}
      selectedFolder=${selectedFolder}
      onTypeChange=${setCurrentRecordType}
    />`
  }

  if (currentRecordType === 'custom') {
    return html`<${CreateOrEditCustomModalContent}
      initialRecord=${initialRecord}
      selectedFolder=${selectedFolder}
      onTypeChange=${setCurrentRecordType}
    />`
  }
}
