import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { DateTime } from "luxon"
import React from "react"
import { Entry } from "../../../types"
import { DATE_FORMAT } from "../../constants"

type EntryCardProps = {
  entry: Entry
}

export const EntryCard: React.FC<EntryCardProps> = ({
  entry: { content, createdAt },
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false,
  })
  return (
    <div className="border border-black w-[300px] p-4 justify-between flex flex-col">
      <p className="text-xs text-grey mb-4">
        {DateTime.fromISO(createdAt).toFormat(DATE_FORMAT)}
      </p>
      <div className="flex flex-col">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
