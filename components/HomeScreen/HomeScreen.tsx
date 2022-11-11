import React from "react"
import { Flex } from "rebass"
import { Header } from "../shared"

type HomeScreenProps = {}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  return (
    <Flex sx={{ height: "100%", marginTop: "16px", paddingX: "16px" }}>
      <Flex sx={{ flex: 1, height: "100%" }}>hi</Flex>
      <Flex sx={{ flex: 3 }}>hji</Flex>
    </Flex>
  )
}
