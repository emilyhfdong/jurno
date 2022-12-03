import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Entry } from "../../components/types"

interface AppState {
  activeEntry: Entry | null
  requiresPin: boolean
  isBlurred: boolean

  editingEntryId: string | null
}

const IS_DEVELOPMENT = process.env.NODE_ENV === "development"

const initialState: AppState = {
  activeEntry: null,
  requiresPin: IS_DEVELOPMENT ? false : true,
  isBlurred: false,
  editingEntryId: null,
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
      requiresPin: IS_DEVELOPMENT ? false : action.payload,
    }),
    setIsBlurred: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isBlurred: action.payload,
    }),
    setEditingEntryId: (state, action: PayloadAction<string | null>) => {
      document.body.style.overflow = action.payload ? "hidden" : "scroll"
      return {
        ...state,
        editingEntryId: action.payload,
      }
    },
  },
})

export const appActions = appSlice.actions
