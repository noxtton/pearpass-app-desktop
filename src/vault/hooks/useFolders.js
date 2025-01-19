import { useSelector } from 'react-redux'

import { selectFolders } from '../slice'

export const useFolders = ({ variables } = {}) => {
  const { isLoading, data } = useSelector(
    selectFolders({
      searchPattern: variables?.searchPattern
    })
  )

  return { isLoading, data }
}
