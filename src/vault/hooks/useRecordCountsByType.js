import { useSelector } from 'react-redux'

import { selectRecordCountsByType } from '../slice'

export const useRecordCountsByType = () => {
  const { isLoading, data } = useSelector(selectRecordCountsByType)

  return { isLoading, data }
}
