import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Entry } from "../../components/types"

interface AppState {
  activeEntry: Entry | null
}

const initialState: AppState = {
  activeEntry: null,
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setActiveEntry: (state, action: PayloadAction<Entry | null>) => ({
      ...state,
      activeEntry: action.payload,
    }),
  },
})

export const appActions = appSlice.actions
