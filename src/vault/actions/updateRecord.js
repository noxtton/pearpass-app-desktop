import { createAsyncThunk } from '@reduxjs/toolkit'

import { validateAndPrepareRecord } from '../utils/validateAndPrepareRecord'

export const updateRecord = createAsyncThunk(
  'vault/updateRecord',
  async (payload) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const record = {
            id: payload.id,
            type: payload.type,
            vaultId: payload.vaultId,
            data: payload.data,
            folder: payload.folder || null,
            isPinned: payload.isPinned,
            isFavorite: payload.isFavorite,
            createdAt: payload.createdAt,
            updatedAt: Date.now()
          }

          const newRecord = validateAndPrepareRecord(record)

          resolve(newRecord)
        } catch (error) {
          console.error(error)

          reject(error)
        }
      }, 1500)
    })
  }
)
