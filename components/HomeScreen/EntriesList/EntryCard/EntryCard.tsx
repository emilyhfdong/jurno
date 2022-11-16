import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { DateTime } from "luxon"
import React from "react"
import { Flex, Text } from "rebass"
import { useThemeContext } from "../../../../theme"
import { DATE_FORMAT } from "../../constants"
import { Entry } from "../../types"

type EntryCardProps = {
  entry: Entry
}

export const EntryCard: React.FC<EntryCardProps> = ({
  entry: { content, createdAt },
}) => {
  const theme = useThemeContext()
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false,
  })
  return (
    <Flex
      sx={{
        border: `1.5px solid ${theme.colors.content}`,
        width: 300,
        padding: 16,
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Text sx={{ fontSize: 12, color: theme.colors.secondaryContent }}>
        {DateTime.fromISO(createdAt).toFormat(DATE_FORMAT)}
      </Text>
      <Flex
        sx={{ flexDirection: "column", maxHeight: "30%", overflow: "hidden" }}
      >
        <EditorContent editor={editor} />
      </Flex>
    </Flex>
  )
}
