import React from "react"
import { trpc } from "../../utils/trpc"
import { EntryCard } from "./EntryCard"

export const HomeScreen: React.FC = () => {
  const { data } = trpc.allEntries.useQuery()

  return (
    <div>
      <div className="fixed border border-black top-8 left-8 w-24 bottom-8 bg-white"></div>
      <div className="fixed border border-black top-8 left-8 right-8 h-24 bg-white"></div>
      {data?.entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  )
}
