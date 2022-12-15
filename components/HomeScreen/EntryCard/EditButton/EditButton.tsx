import { Editor } from "@tiptap/react"
import React from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../../../../redux/hooks"
import { appActions } from "../../../../redux/slices/appSlice"

type EditButtonProps = {
  saveEntry: () => void
  editor: Editor | null
  entryId: string
}

export const EditButton: React.FC<EditButtonProps> = ({ editor, entryId }) => {
  const dispatch = useDispatch()
  const isEditing = useAppSelector((state) => !!state.app.editingEntryId)

  const onEditToggle = () => {
    dispatch(appActions.setActiveEditor(isEditing ? null : editor))
    dispatch(appActions.setEditingEntryId(isEditing ? null : entryId))
  }

  return (
    <div
      onClick={onEditToggle}
      className="flex items-center cursor-pointer mr-4"
    >
      {isEditing ? "Done" : "Edit"}
      <i className="ri-arrow-right-s-line"></i>
    </div>
  )
}
