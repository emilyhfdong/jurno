import { DateTime } from "luxon"
import React, { useCallback, useState } from "react"
import { Flex, Text } from "rebass"
import { useThemeContext } from "../../../theme"
import { useEditor, EditorContent, JSONContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import axios from "axios"
import { BackendEntry, Entry } from "../types"
import { transformBackendEntry } from "../utils"
import { DATE_FORMAT } from "../constants"

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
  const theme = useThemeContext()

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    autofocus: true,
    onUpdate: ({ editor }) => {
      debounce(() => saveEntry(editor.getJSON()))
    },
  })
  const [persistedStringifiedContent, setPersistedStringifiedContent] =
    useState(JSON.stringify(initialEntry.content ?? INITIAL_EDITOR_JSON))

  const startDate = DateTime.fromISO(initialEntry.createdAt)

  const saveEntry = useCallback(
    async (jsonContent: JSONContent) => {
      const response = await axios.patch<{ entry: BackendEntry }>(
        `/api/entries/${initialEntry.id}`,
        {
          content: jsonContent,
        }
      )
      const newEntry = transformBackendEntry(response.data.entry)
      setPersistedStringifiedContent(JSON.stringify(newEntry.content))
    },
    [initialEntry.id]
  )

  const isSaved =
    persistedStringifiedContent === JSON.stringify(editor?.getJSON())

  return (
    <Flex
      sx={{
        flex: 1,
        padding: 16,
        border: `1.5px solid ${theme.colors.content}`,
        flexDirection: "column",
      }}
    >
      <Flex
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
          color: theme.colors.secondaryContent,
        }}
      >
        <Text sx={{ fontSize: 12 }}>{startDate.toFormat(DATE_FORMAT)}</Text>
        {isSaved && <i className="ri-check-line"></i>}
      </Flex>

      <Flex
        sx={{
          flex: 1,
          "div:first-of-type": {
            width: "100%",
            height: "100%",
          },
        }}
      >
        <EditorContent editor={editor} />
      </Flex>
    </Flex>
  )
}
