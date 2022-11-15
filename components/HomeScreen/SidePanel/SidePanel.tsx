import React, { useCallback } from "react"
import { Button, Flex, Text } from "rebass"
import { useThemeContext } from "../../../theme"
import { DateTime } from "luxon"
import axios from "axios"
import { BackendEntry, Entry } from "../types"

type SidePanelProps = {
  onAddNewEntry: (entry: Entry) => void
}

export const SidePanel: React.FC<SidePanelProps> = ({ onAddNewEntry }) => {
  const theme = useThemeContext()
  const todaysDate = DateTime.now()

  const onClick = useCallback(async () => {
    const response = await axios.post<{ entry: BackendEntry }>("/api/entries")
    const { content, created_at, last_updated, id } = response.data.entry
    onAddNewEntry({
      id,
      content,
      createdAt: created_at,
      lastUpdated: last_updated,
    })
  }, [onAddNewEntry])

  return (
    <Flex
      sx={{
        flex: 1,
        border: `1.5px solid ${theme.colors.content}`,
        padding: 16,
        flexDirection: "column",
        backgroundColor: theme.colors.content,
        color: theme.colors.background,
        justifyContent: "space-between",
      }}
    >
      <Flex sx={{ flex: 1, flexDirection: "column" }}>
        <Text sx={{ fontFamily: theme.fonts.serif, fontSize: 24 }}>
          {todaysDate.weekdayLong}
        </Text>
        <Text sx={{ fontSize: 12, marginTop: "4px" }}>
          {todaysDate.toFormat("MMM d, yyyy")}
        </Text>
      </Flex>
      <Flex sx={{ justifyContent: "flex-end", padding: "4px" }}>
        <Button
          onClick={onClick}
          sx={{
            backgroundColor: theme.colors.background,
            color: theme.colors.content,
            borderRadius: 0,
            height: 30,
            width: 30,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: "rotate(45deg)",
            cursor: "pointer",
          }}
        >
          <i style={{ transform: "rotate(45deg)" }} className="ri-add-line"></i>
        </Button>
      </Flex>
    </Flex>
  )
}
