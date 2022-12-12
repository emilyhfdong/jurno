import { motion } from "framer-motion"
import React from "react"
import { useTheme } from "../shared"
import { Calendar } from "./Calendar"

type SideBarProps = {}

export const SideBar: React.FC<SideBarProps> = () => {
  const theme = useTheme()

  return (
    <motion.div
      animate={{ borderColor: theme.border, color: theme.content }}
      className="flex fixed border border-grey top-4 md:top-8 left-4 md:left-8 w-8 md:w-44 bottom-4 md:bottom-8 flex-col items-center justify-end text-xs md:text-base z-10"
    >
      <Calendar />
    </motion.div>
  )
}
