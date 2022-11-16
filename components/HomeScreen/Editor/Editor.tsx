import { DateTime } from "luxon"
import React, { useState } from "react"
import { Flex, Text } from "rebass"
import { useThemeContext } from "../../../theme"
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
  const theme = useThemeContext()

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    autofocus: true,
    onUpdate: ({ editor }) => {
      debounce(() => mutate({ content: editor.getJSON(), id: initialEntry.id }))
    },
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
