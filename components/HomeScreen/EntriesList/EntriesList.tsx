import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import React from "react"
import { Flex } from "rebass"
import { BackendEntry, Entry } from "../types"
import { transformBackendEntry } from "../utils"
import { EntryCard } from "./EntryCard"

type EntriesListProps = {}

export const EntriesList: React.FC<EntriesListProps> = () => {
  const { data } = useQuery<Entry[]>({
    queryKey: ["entries"],
    queryFn: async () => {
      const response = await axios.get<{ entries: BackendEntry[] }>(
        "/api/entries"
      )
      return response.data.entries.map(transformBackendEntry)
    },
  })

  return (
    <Flex sx={{ gap: 16 }}>
      {data?.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </Flex>
  )
}
