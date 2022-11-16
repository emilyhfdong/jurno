import React from "react"
import { trpc } from "../../../utils/trpc"

import { EntryCard } from "./EntryCard"

type EntriesListProps = {}

export const EntriesList: React.FC<EntriesListProps> = () => {
  const { data } = trpc.allEntries.useQuery()

  return (
    <div className="gap-4">
      {data?.entries?.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  )
}
