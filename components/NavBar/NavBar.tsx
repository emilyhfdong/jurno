import { motion } from "framer-motion"
import React from "react"
import { useAppSelector } from "../../redux/hooks"
import { EDIT_MODE_TRANSITION } from "../HomeScreen/EntryCard/utils"
import { BREAKPOINTS, useScreenWidth, useTheme } from "../shared"

type NavBarProps = {}

export const NavBar: React.FC<NavBarProps> = () => {
  const isEditing = useAppSelector((state) => !!state.app.editingEntryId)
  const requiresPin = useAppSelector((state) => state.app.requiresPin)
  const theme = useTheme()

  const screenWidth = useScreenWidth()
  const isMobile = screenWidth <= BREAKPOINTS.md

  return (
    <motion.div
      transition={EDIT_MODE_TRANSITION}
      animate={{
        height: isEditing ? 0 : isMobile ? "2rem" : "4rem",
        borderBottomWidth: isEditing ? 0 : 1,
        borderColor: requiresPin ? theme.grey : theme.content,
      }}
      className={`fixed border h-8 md:h-16 border-grey top-4 md:top-8 left-4 md:left-8 right-4 md:right-8 z-10`}
    ></motion.div>
  )
}
