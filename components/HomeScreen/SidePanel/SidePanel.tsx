import React from "react"
import { Flex, Text } from "rebass"
import { useThemeContext } from "../../../theme"
import { DateTime } from "luxon"

type SidePanelProps = {}

export const SidePanel: React.FC<SidePanelProps> = () => {
  const theme = useThemeContext()
  const todaysDate = DateTime.now()

  return (
    <Flex
      sx={{
        flex: 1,
        border: `1.5px solid ${theme.colors.content}`,
        padding: 16,
        flexDirection: "column",
        backgroundColor: theme.colors.content,
        color: theme.colors.background,
      }}
    >
      <Text sx={{ fontFamily: theme.fonts.serif, fontSize: 24 }}>
        {todaysDate.weekdayLong}
      </Text>
      <Text sx={{ fontSize: 12, marginTop: "4px" }}>
        {todaysDate.toFormat("MMM d, yyyy")}
      </Text>
    </Flex>
  )
}
