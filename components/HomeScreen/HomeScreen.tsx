import { motion } from "framer-motion"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../../redux/hooks"
import { appActions } from "../../redux/slices/appSlice"
import { trpc } from "../../utils/trpc"
import { useTheme } from "../shared"
import { CheckPin } from "./CheckPin"
import { EntryCard } from "./EntryCard"
import { NavBar } from "./NavBar"
import { SideBar } from "./SideBar"

export const HomeScreen: React.FC = () => {
  const isBlurred = useAppSelector((state) => state.app.isBlurred)
  const requiresPin = useAppSelector((state) => state.app.requiresPin)

  const { data } = trpc.allEntries.useQuery()
  const dispatch = useDispatch()
  const theme = useTheme()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.code === "KeyB") {
        dispatch(appActions.setIsBlurred(!isBlurred))
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [dispatch, isBlurred])

  useEffect(() => {
    const onBlur = () => {
      dispatch(appActions.setRequiresPin(true))
    }
    window.addEventListener("blur", onBlur)
    return () => window.removeEventListener("blur", onBlur)
  }, [dispatch])

  return (
    <motion.div
      style={{ backgroundColor: theme.background }}
      initial={false}
      animate={{ backgroundColor: theme.background }}
      className="min-h-screen w-screen"
    >
      <SideBar />
      <NavBar />
      <CheckPin />
      <motion.div animate={{ opacity: requiresPin ? 0 : 1 }}>
        {data?.entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </motion.div>
    </motion.div>
  )
}
