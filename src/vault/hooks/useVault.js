import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { getVaultById } from '../actions/getVaultById'
import { selectVault } from '../slice'

export const useVault = ({ onCompleted, shouldSkip, variables } = {}) => {
  const dispatch = useDispatch()

  const { isLoading, data } = useSelector(selectVault)

  const fetchVault = async (vaultId) => {
    const { payload, error } = await dispatch(getVaultById(vaultId))

    if (!error) {
      onCompleted?.(payload)
    }
  }

  useEffect(() => {
    if (data || shouldSkip) {
      return
    }

    fetchVault(variables?.vaultId)
  }, [data, variables?.vaultId])

  const refetch = (vaultId) => {
    fetchVault(vaultId || variables?.vaultId)
  }

  return { isLoading, data, refetch }
}
