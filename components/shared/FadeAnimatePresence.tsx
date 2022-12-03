import { AnimatePresence, motion } from "framer-motion"
import React from "react"

type FadeAnimatePresenceProps = {
  isVisible: boolean
  children: React.ReactNode
}

export const FadeAnimatePresence: React.FC<FadeAnimatePresenceProps> = ({
  isVisible,
  children,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial="closed"
          animate="open"
          variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
