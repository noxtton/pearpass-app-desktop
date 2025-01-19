import { useLingui } from '@lingui/react'

import { useDeleteRecord } from '../vault/hooks/useDeleteRecord'
import { useUpdateRecord } from '../vault/hooks/useUpdateRecord'

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

  const { deleteRecord } = useDeleteRecord()
  const { updateRecord } = useUpdateRecord()

  const handleDelete = () => {
    deleteRecord(record.id)

    onClose?.()
  }

  const handlePin = () => {
    updateRecord({
      ...record,
      isPinned: !record.isPinned
    })

    onClose?.()
  }

  const handleSelect = () => {
    onSelect?.(record)

    onClose?.()
  }

  const defaultActions = [
    { name: i18n._('Select element'), type: 'select', click: handleSelect },
    { name: i18n._('Pin element'), type: 'pin', click: handlePin },
    { name: i18n._('Move to another folder'), type: 'move' },
    { name: i18n._('Delete element'), type: 'delete', click: handleDelete }
  ]

  const filteredActions = excludeTypes.length
    ? defaultActions.filter((action) => !excludeTypes.includes(action.type))
    : defaultActions

  return { actions: filteredActions }
}
