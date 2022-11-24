import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { DateTime } from "luxon"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../../../../redux/hooks"
import { appActions } from "../../../../redux/slices/appSlice"
import { trpc } from "../../../../utils/trpc"
import { Entry } from "../../../types"
import { DATE_FORMAT } from "../../constants"

type EntryCardProps = {
  entry: Entry
}

export const EntryCard: React.FC<EntryCardProps> = ({ entry }) => {
  const { content, createdAt, id, title } = entry
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false,
  })

  useEffect(() => {
    editor?.commands.setContent(entry.content)
  }, [entry.content, editor?.commands])

  const isBlurred = useAppSelector((state) => state.app.isBlurred)

  const utils = trpc.useContext()

  const { isLoading, mutate } = trpc.deleteEntry.useMutation({
    onSettled: () => {
      utils.allEntries.invalidate()
    },
  })
  const dispatch = useDispatch()

  return (
    <div
      onClick={() => dispatch(appActions.setActiveEntry(entry))}
      className="flex h-full cursor-pointer flex-col justify-between p-4 "
    >
      <div className="mb-4 flex items-end justify-between">
        <p className="text-xs text-grey">
          {DateTime.fromISO(createdAt).toFormat(DATE_FORMAT)}
        </p>
        {isLoading ? (
          <i className="ri-loader-line animate-spin-slow"></i>
        ) : (
          <i
            onClick={(e) => {
              mutate({ id })
              e.stopPropagation()
            }}
            className="ri-delete-bin-line cursor-pointer text-xs text-red-400"
          ></i>
        )}
      </div>
      <div className={`flex flex-col ${isBlurred && "blur-sm"}`}>
        <p className="mb-4 font-serif text-xl">{title}</p>
        {DateTime.fromISO(entry.lastUpdated).toFormat("h:mma")}
        <div className="text-sm ">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  )
}
