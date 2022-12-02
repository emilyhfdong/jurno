import { motion } from "framer-motion"
import React from "react"
import { useAppSelector } from "../../redux/hooks"
import { trpc } from "../../utils/trpc"
import { EntryCard } from "./EntryCard"
import { EDIT_MODE_TRANSITION } from "./EntryCard/utils"

export const HomeScreen: React.FC = () => {
  const { data } = trpc.allEntries.useQuery()
  const isEditing = useAppSelector((state) => !!state.app.editingEntryId)

  return (
    <div>
      <div className="fixed border border-black top-8 left-8 w-24 bottom-8 bg-white"></div>
      <motion.div
        transition={EDIT_MODE_TRANSITION}
        animate={{
          height: isEditing ? 0 : "6rem",
          borderBottomWidth: isEditing ? 0 : 1,
        }}
        className={`fixed border border-black  top-8 left-8 right-8 bg-white`}
      ></motion.div>
      {data?.entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  )
}
