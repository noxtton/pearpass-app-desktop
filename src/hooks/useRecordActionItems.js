import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useDeleteRecord, useUpdateRecord } from 'pearpass-lib-vault'

import { MoveFolderModalContent } from '../containers/Modal/MoveFolderModalContent'
import { useModal } from '../context/ModalContext'

/**
 * @param {{
 *  excludeType: Array<string>
 *  record: {
 *    id: string
 *  }
 *  onSelect: () => void
 *  onClose: () => void
 * }}
 *
 * @returns {{
 *  actions: Array<{
 *  name: string,
 *  type: string
 * }>}}
 */
export const useRecordActionItems = ({
  excludeTypes = [],
  record,
  onSelect,
  onClose
} = {}) => {
  const { i18n } = useLingui()
  const { setModal } = useModal()

  const { deleteRecord } = useDeleteRecord()
  const { updatePinnedState } = useUpdateRecord()

  const handleDelete = () => {
    deleteRecord(record.id)

    onClose?.()
  }

  const handlePin = () => {
    updatePinnedState(record.id, !record.isPinned)

    onClose?.()
  }

  const handleSelect = () => {
    onSelect?.(record)

    onClose?.()
  }

  const handleMoveClick = () => {
    setModal(html` <${MoveFolderModalContent} records=${[record]} /> `)

    onClose?.()
  }

  const defaultActions = [
    { name: i18n._('Select element'), type: 'select', click: handleSelect },
    { name: i18n._('Pin element'), type: 'pin', click: handlePin },
    {
      name: i18n._('Move to another folder'),
      type: 'move',
      click: handleMoveClick
    },
    { name: i18n._('Delete element'), type: 'delete', click: handleDelete }
  ]

  const filteredActions = excludeTypes.length
    ? defaultActions.filter((action) => !excludeTypes.includes(action.type))
    : defaultActions

  return { actions: filteredActions }
}
