import { DateTime } from "luxon"
import React, { useRef, useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Entry } from "../../types"
import { DATE_FORMAT } from "../constants"
import { trpc } from "../../../utils/trpc"

type EditorProps = {
  initialEntry: Entry
}

let saveTimer: number | ReturnType<typeof setTimeout>
const DEBOUNCE_TIME_IN_MS = 1000

const debounce = (callback: () => void) => {
  if (saveTimer) {
    clearTimeout(saveTimer)
  }
  saveTimer = setTimeout(callback, DEBOUNCE_TIME_IN_MS)
}

const INITIAL_EDITOR_JSON = {
  type: "doc",
  content: [
    {
      type: "paragraph",
    },
  ],
}

export const Editor: React.FC<EditorProps> = ({ initialEntry }) => {
  const ref = useRef<HTMLDivElement>(null)

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    autofocus: true,
    onUpdate: ({ editor }) => {
      debounce(() => mutate({ content: editor.getJSON(), id: initialEntry.id }))
    },
    editorProps: { attributes: { class: "bg-red-10" } },
  })
  const [persistedStringifiedContent, setPersistedStringifiedContent] =
    useState(JSON.stringify(initialEntry.content ?? INITIAL_EDITOR_JSON))

  const startDate = DateTime.fromISO(initialEntry.createdAt)

  const { mutate } = trpc.updateEntry.useMutation({
    onSuccess: ({ entry: { content } }) =>
      setPersistedStringifiedContent(JSON.stringify(content)),
  })

  const isSaved =
    persistedStringifiedContent === JSON.stringify(editor?.getJSON())

  return (
    <div className="flex flex-1 flex-col p-4 border border-black">
      <div className="flex justify-between items-center mb-6 text-grey">
        <p className="text-xs">{startDate.toFormat(DATE_FORMAT)}</p>
        {isSaved && <i className="ri-check-line"></i>}
      </div>

      <div ref={ref} className="h-screen [&_div]:h-full ">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
