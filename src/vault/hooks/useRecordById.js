import { useSelector } from 'react-redux'

import { selectRecordById } from '../slice'

export const useRecordById = ({ variables } = {}) => {
  const { isLoading, data } = useSelector(selectRecordById(variables?.id))

  return { isLoading, data }
}
