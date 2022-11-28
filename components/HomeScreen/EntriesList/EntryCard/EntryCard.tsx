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
  const requiresPin = useAppSelector((state) => state.app.requiresPin)

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(entry.content)
    }
  }, [entry.content, editor])

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
      {!requiresPin ? (
        <div
          className={`flex flex-col ${
            isBlurred ? "blur-sm" : ""
          } max-h-[30%] overflow-hidden`}
        >
          <p className="mb-3 font-serif text-xl">{title}</p>
          <div className="text-sm">
            <EditorContent editor={editor} />
          </div>
        </div>
      ) : null}
    </div>
  )
}
