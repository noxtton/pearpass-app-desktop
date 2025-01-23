import { useDispatch, useSelector } from 'react-redux'

import { createFolder as createFolderAction } from '../actions/createFolder'
import { selectVault } from '../slice'

export const useCreateFolder = ({ onCompleted } = {}) => {
  const dispatch = useDispatch()

  const { isFolderLoading: isLoading } = useSelector(selectVault)

  const createFolder = async (folderName) => {
    const { error, payload } = await dispatch(createFolderAction(folderName))

    if (!error) {
      onCompleted?.(payload)
    }
  }

  return { isLoading, createFolder }
}
