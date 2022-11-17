import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { DateTime } from "luxon"
import React from "react"
import { trpc } from "../../../../utils/trpc"
import { Entry } from "../../../types"
import { DATE_FORMAT } from "../../constants"

type EntryCardProps = {
  entry: Entry
}

export const EntryCard: React.FC<EntryCardProps> = ({
  entry: { content, createdAt, id },
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false,
  })

  const utils = trpc.useContext()

  const { isLoading, mutate } = trpc.deleteEntry.useMutation({
    onSuccess: () => utils.allEntries.invalidate(),
  })

  return (
    <div className="border border-black w-[300px] p-4 justify-between flex flex-col mb-4">
      <div className="flex flex-1 justify-between items-end mb-4">
        <p className="text-xs text-grey">
          {DateTime.fromISO(createdAt).toFormat(DATE_FORMAT)}
        </p>
        {isLoading ? (
          <i className="ri-loader-line animate-spin-slow"></i>
        ) : (
          <i
            onClick={() => mutate({ id })}
            className="ri-delete-bin-line text-red-400 cursor-pointer text-xs"
          ></i>
        )}
      </div>
      <div className="flex flex-col">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
