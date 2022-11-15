import React, { useState } from "react"
import { Flex } from "rebass"
import { Editor } from "./Editor"
import { EntriesList } from "./EntriesList"
import { SidePanel } from "./SidePanel"
import { Entry } from "./types"

type HomeScreenProps = {}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  const [activeEntry, setActiveEntry] = useState<Entry | null>(null)

  return (
    <Flex
      sx={{
        marginY: 16,
        paddingX: 16,
        flex: 1,
        gap: 16,
      }}
    >
      <Flex sx={{ flex: 1 }}>
        <SidePanel onAddNewEntry={setActiveEntry} />
      </Flex>
      <Flex sx={{ flex: 4 }}>
        {activeEntry ? <Editor initialEntry={activeEntry} /> : <EntriesList />}
      </Flex>
    </Flex>
  )
}
