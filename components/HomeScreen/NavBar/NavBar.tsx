import { motion } from "framer-motion"
import React from "react"
import { useAppSelector } from "../../../redux/hooks"
import { useTheme } from "../../shared"
import { EDIT_MODE_TRANSITION } from "../EntryCard/utils"

type NavBarProps = {}

export const NavBar: React.FC<NavBarProps> = () => {
  const isEditing = useAppSelector((state) => !!state.app.editingEntryId)
  const requiresPin = useAppSelector((state) => state.app.requiresPin)
  const thene = useTheme()

  return (
    <motion.div
      transition={EDIT_MODE_TRANSITION}
      animate={{
        height: isEditing ? 0 : "4rem",
        borderBottomWidth: isEditing ? 0 : 1,
        borderColor: requiresPin ? thene.grey : thene.content,
      }}
      className={`fixed border h-16 border-grey top-8 left-8 right-8 z-10`}
    ></motion.div>
  )
}
