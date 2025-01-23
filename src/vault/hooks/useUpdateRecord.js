import { useDispatch, useSelector } from 'react-redux'

import { updateRecord as updateRecordAction } from '../actions/updateRecord'
import { selectVault } from '../slice'

export const useUpdateRecord = ({ onCompleted } = {}) => {
  const dispatch = useDispatch()

  const { isRecordLoading: isLoading } = useSelector(selectVault)

  const updateRecord = async (record) => {
    const { error, payload } = await dispatch(updateRecordAction(record))

    if (!error) {
      onCompleted?.(payload)
    }
  }

  return { isLoading, updateRecord }
}
