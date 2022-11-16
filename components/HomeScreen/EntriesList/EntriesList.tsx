import React from "react"
import { Flex } from "rebass"
import { trpc } from "../../../utils/trpc"

import { EntryCard } from "./EntryCard"

type EntriesListProps = {}

export const EntriesList: React.FC<EntriesListProps> = () => {
  const { data } = trpc.allEntries.useQuery()

  return (
    <Flex sx={{ gap: 16 }}>
      {data?.entries?.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </Flex>
  )
}
