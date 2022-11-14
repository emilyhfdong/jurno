import { DateTime } from "luxon"
import React, { useState } from "react"
import { Flex, Text } from "rebass"
import { useThemeContext } from "../../../theme"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

type EditorProps = {}

export const Editor: React.FC<EditorProps> = () => {
  const theme = useThemeContext()
  const [startDate] = useState(DateTime.now())
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    autofocus: true,
  })
  const [persistedState, setPersistedState] = useState("")

  console.log("hii", editor?.getJSON())
  return (
    <Flex
      sx={{
        flex: 1,
        padding: 16,
        border: `1.5px solid ${theme.colors.content}`,
        flexDirection: "column",
      }}
    >
      <Text
        sx={{
          marginBottom: 24,
          fontSize: 12,
          color: theme.colors.secondaryContent,
        }}
      >
        {startDate.toFormat("ccc LLL d yyyy 'at' h:ma")}
      </Text>
      <Flex
        sx={{
          flex: 1,
          "div:first-child": {
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
