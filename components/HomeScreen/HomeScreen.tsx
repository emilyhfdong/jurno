import React from "react"
import { Flex } from "rebass"
import { Editor } from "./Editor"
import { SidePanel } from "./SidePanel"

type HomeScreenProps = {}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
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
        <SidePanel />
      </Flex>
      <Flex sx={{ flex: 4 }}>
        <Editor />
      </Flex>
    </Flex>
  )
}
