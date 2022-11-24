import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Entry } from "../../components/types"

interface AppState {
  activeEntry: Entry | null
  requiresPin: boolean
}

const initialState: AppState = {
  activeEntry: null,
  requiresPin: true,
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setActiveEntry: (state, action: PayloadAction<Entry | null>) => ({
      ...state,
      activeEntry: action.payload,
    }),
    setRequiresPin: (state, action: PayloadAction<boolean>) => ({
      ...state,
      requiresPin: action.payload,
    }),
  },
})

export const appActions = appSlice.actions
