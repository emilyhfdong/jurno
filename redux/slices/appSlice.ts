import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Editor } from "@tiptap/react"

interface AppState {
  requiresPin: boolean
  isBlurred: boolean
  editingEntryId: string | null
  currentEntryDate: string | null
  activeEditor: Editor | null
}

const IS_DEVELOPMENT = process.env.NODE_ENV === "development"
// const IS_DEVELOPMENT = false

const initialState: AppState = {
  requiresPin: IS_DEVELOPMENT ? false : true,
  isBlurred: false,
  editingEntryId: null,
  currentEntryDate: null,
  activeEditor: null,
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
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
    setCurrentEntryDate: (state, action: PayloadAction<string | null>) => ({
      ...state,
      currentEntryDate: action.payload,
    }),
    setActiveEditor: (state, action: PayloadAction<Editor | null>) => ({
      ...state,
      activeEditor: action.payload,
    }),
  },
})

export const appActions = appSlice.actions
