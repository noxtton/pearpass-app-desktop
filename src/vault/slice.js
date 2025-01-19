import { createSlice } from '@reduxjs/toolkit'

import { createFolder } from './actions/createFolder'
import { createRecord } from './actions/createRecord'
import { createVault } from './actions/createVault'
import { deleteRecord } from './actions/deleteRecord'
import { getVaultById } from './actions/getVaultById'
import { updateRecord } from './actions/updateRecord'
import { matchPatternToValue } from '../utils/matchPatternToValue'

const initialState = {
  isLoading: true,
  isRecordLoading: false,
  isFolderLoading: false,
  data: null,
  error: null
}

export const vaultSlice = createSlice({
  name: 'vault',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getVaultById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getVaultById.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(getVaultById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error
      })

    builder
      .addCase(createVault.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createVault.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(createVault.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error
      })

    builder
      .addCase(createRecord.pending, (state) => {
        state.isRecordLoading = true
      })
      .addCase(createRecord.fulfilled, (state, action) => {
        state.isRecordLoading = false
        state.data.records.push(action.payload)
      })
      .addCase(createRecord.rejected, (state, action) => {
        state.isRecordLoading = false
        state.error = action.error
      })

    builder
      .addCase(updateRecord.pending, (state) => {
        state.isRecordLoading = true
      })
      .addCase(updateRecord.fulfilled, (state, action) => {
        state.isRecordLoading = false
        state.data.records =
          state.data?.records?.map((record) =>
            record.id === action.payload.id ? action.payload : record
          ) ?? []
      })
      .addCase(updateRecord.rejected, (state, action) => {
        state.isRecordLoading = false
        state.error = action.error
      })

    builder
      .addCase(deleteRecord.pending, (state) => {
        state.isRecordLoading = true
      })
      .addCase(deleteRecord.fulfilled, (state, action) => {
        state.isRecordLoading = false
        state.data.records = state.data.records.filter(
          (record) => record.id !== action.payload
        )
      })
      .addCase(deleteRecord.rejected, (state, action) => {
        state.isRecordLoading = false
        state.error = action.error
      })

    builder
      .addCase(createFolder.pending, (state) => {
        state.isFolderLoading = true
      })
      .addCase(createFolder.fulfilled, (state, action) => {
        state.isFolderLoading = false
        state.data.records.push(action.payload)
      })
      .addCase(createFolder.rejected, (state, action) => {
        state.isFolderLoading = false
        state.error = action.error
      })
  }
})

export const selectVault = (state) => state?.vault

export const selectRecordById = (id) => (state) => {
  return {
    isLoading: state.vault.isRecordLoading,
    data: state.vault.data?.records?.find((record) => record.id === id)
  }
}

export const selectRecords =
  ({ filters, sort } = {}) =>
  (state) => {
    const records =
      state.vault.data?.records?.filter((record) => {
        if (
          (filters?.folder || filters?.folder === null) &&
          record.folder !== filters?.folder
        ) {
          return false
        }

        if (
          !!filters?.searchPattern?.length &&
          !matchPatternToValue(filters.searchPattern, record.data.title) &&
          !matchPatternToValue(filters.searchPattern, record.folder)
        ) {
          return false
        }

        if (filters?.type && record.type !== filters.type) {
          return false
        }

        return true
      }) ?? []

    const sortedRecords = [...records].sort((a, b) => {
      if (a.isPinned === b.isPinned) {
        if (sort?.key === 'updatedAt') {
          return sort?.direction === 'asc'
            ? a.updatedAt - b.updatedAt
            : b.updatedAt - a.updatedAt
        }

        if (sort?.key === 'createdAt') {
          return sort?.direction === 'asc'
            ? a.createdAt - b.createdAt
            : b.createdAt - a.createdAt
        }
      }

      return a.isPinned ? -1 : 1
    })

    return {
      isLoading: state.vault.isLoading,
      data: sortedRecords
    }
  }

export const selectFolders = (filters) => (state) => {
  const { isLoading, data: records } = selectRecords({
    filters: {
      searchPattern: filters?.searchPattern
    }
  })(state)

  return {
    isLoading: isLoading,
    data: records?.reduce(
      (acc, record) => {
        const folder = record.folder

        if (!folder) {
          acc.noFolder.records.push(record)

          return acc
        }

        if (!acc.customFolders?.[folder]) {
          acc.customFolders[folder] = {
            name: folder,
            records: []
          }
        }

        if (record.isFavorite) {
          acc.favorites.records.push(record)

          return acc
        }

        acc.customFolders[folder].records.push(record)

        return acc
      },
      {
        favorites: { records: [] },
        noFolder: { records: [] },
        customFolders: {}
      }
    )
  }
}

export default vaultSlice.reducer
