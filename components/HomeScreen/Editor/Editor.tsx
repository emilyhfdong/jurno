import { DateTime } from "luxon"
import React, { useCallback, useState } from "react"
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

const getStringifiedEntry = ({
  content,
  title,
}: Pick<Entry, "content" | "title">) =>
  JSON.stringify(content ?? INITIAL_EDITOR_JSON) + title

export const Editor: React.FC<EditorProps> = ({ initialEntry }) => {
  const [persistedStringifiedContent, setPersistedStringifiedContent] =
    useState(getStringifiedEntry(initialEntry))
  const startDate = DateTime.fromISO(initialEntry.createdAt)

  const [title, setTitle] = useState(initialEntry.title)

  const { mutate } = trpc.updateEntry.useMutation({
    onSuccess: ({ entry: { content, title } }) =>
      setPersistedStringifiedContent(getStringifiedEntry({ content, title })),
  })

  const onTitleChange = useCallback(
    (newTitle: string) => {
      setTitle(newTitle)
      debounce(() => mutate({ title: newTitle, id: initialEntry.id }))
    },
    [setTitle, initialEntry, mutate]
  )

  const contentEditor = useEditor({
    extensions: [StarterKit],
    onUpdate: ({ editor }) => {
      debounce(() => mutate({ content: editor.getJSON(), id: initialEntry.id }))
    },
    autofocus: true,
  })

  const isSaved =
    persistedStringifiedContent ===
    getStringifiedEntry({
      content: contentEditor?.getJSON() ?? null,
      title,
    })

  return (
    <div className="flex flex-1 flex-col p-4 border border-black">
      <div className="flex justify-between items-center mb-2 text-grey">
        <p className="text-xs">{startDate.toFormat(DATE_FORMAT)}</p>
        <i className={`ri-check-line ${isSaved ? "" : "text-transparent"}`}></i>
      </div>
      <div className="font-serif text-2xl mb-4">
        <input
          className="bg-transparent outline-none w-full"
          value={title || ""}
          onChange={(e) => onTitleChange(e.target.value)}
        />
      </div>
      <div className="h-screen [&_div]:h-full ">
        <EditorContent editor={contentEditor} />
      </div>
    </div>
  )
}
