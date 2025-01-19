import { configureStore } from '@reduxjs/toolkit'

import vaultReducer from './slice'

export const store = configureStore({
  reducer: {
    vault: vaultReducer
  }
})
