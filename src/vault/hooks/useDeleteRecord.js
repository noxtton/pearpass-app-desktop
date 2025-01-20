import { useDispatch, useSelector } from 'react-redux'

import { deleteRecord as deleteRecordAction } from '../actions/deleteRecord'
import { selectVault } from '../slice'

export const useDeleteRecord = ({ onCompleted } = {}) => {
  const dispatch = useDispatch()

  const { isRecordLoading: isLoading } = useSelector(selectVault)

  const deleteRecord = async (recordId) => {
    const { error, payload } = await dispatch(deleteRecordAction(recordId))

    if (!error) {
      onCompleted?.(payload)
    }
  }

  return { isLoading, deleteRecord }
}
