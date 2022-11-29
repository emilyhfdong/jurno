import { DateTime } from "luxon"
import React, { useCallback, useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

import { Entry } from "../../types"
import { trpc } from "../../../utils/trpc"
import { useAppSelector } from "../../../redux/hooks"
import { Toolbar } from "./Toolbar"
import { debounce, getStringifiedEntry } from "./utils"
import { getEntryStartEndDate } from "../utils"

type EditorProps = {
  entry: Entry
}

export const Editor: React.FC<EditorProps> = ({ entry }) => {
  const [persistedStringifiedContent, setPersistedStringifiedContent] =
    useState(getStringifiedEntry(entry))
  const startDate = DateTime.fromISO(entry.createdAt)

  const isBlurred = useAppSelector((state) => state.app.isBlurred)
  const requiresPin = useAppSelector((state) => state.app.requiresPin)

  const [title, setTitle] = useState(entry.title)

  const { mutate } = trpc.updateEntry.useMutation({
    onSuccess: ({ entry: { content, title } }) =>
      setPersistedStringifiedContent(getStringifiedEntry({ content, title })),
  })

  const onTitleChange = useCallback(
    (newTitle: string) => {
      setTitle(newTitle)
      debounce(() => mutate({ title: newTitle, id: entry.id }))
    },
    [setTitle, entry, mutate]
  )

  const editor = useEditor({
    extensions: [StarterKit],
    onUpdate: ({ editor }) => {
      debounce(() => mutate({ content: editor.getJSON(), id: entry.id }))
    },
    autofocus: !Boolean(entry.content),
    content: entry.content,
  })

  const isSaved =
    persistedStringifiedContent ===
    getStringifiedEntry({
      content: editor?.getJSON() ?? null,
      title,
    })

  return (
    <div className="flex flex-1 h-full flex-col border border-black">
      <Toolbar
        editor={editor}
        entryId={entry.id}
        entryHasFinished={!!entry.finishedAt}
      />
      <div className="flex flex-1 flex-col p-4 overflow-scroll">
        <div className="flex justify-between items-center mb-2 text-grey">
          <p className="text-xs">
            {getEntryStartEndDate({
              finishedAt: entry.finishedAt,
              createdAt: entry.createdAt,
            })}
          </p>
          <i
            className={`ri-check-line ${isSaved ? "" : "text-transparent"}`}
          ></i>
        </div>
        {!requiresPin ? (
          <>
            <div
              className={`font-serif text-2xl mb-4 ${
                isBlurred ? "blur-sm" : ""
              }`}
            >
              <input
                className="bg-transparent outline-none w-full"
                value={title || ""}
                onChange={(e) => onTitleChange(e.target.value)}
              />
            </div>
            <div
              className={`h-full [&_div]:h-full ${isBlurred ? "blur-sm" : ""}`}
            >
              <EditorContent editor={editor} />
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
