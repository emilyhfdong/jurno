import { useQueryClient } from "@tanstack/react-query"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { DateTime } from "luxon"
import React from "react"
import { useDispatch } from "react-redux"
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

  const queryClient = useQueryClient()
  const { isLoading, mutate } = trpc.deleteEntry.useMutation({
    onSettled: () => {
      // TODO - make this work instead: utils.allEntries.invalidate()
      queryClient.invalidateQueries([["allEntries"], { type: "query" }])
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
            onClick={() => mutate({ id })}
            className="ri-delete-bin-line cursor-pointer text-xs text-red-400"
          ></i>
        )}
      </div>
      <div className="flex flex-col">
        <p className="mb-4 font-serif text-xl">{title}</p>
        <div className="text-sm">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  )
}
