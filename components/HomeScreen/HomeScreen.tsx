import { motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../../redux/hooks"
import { appActions } from "../../redux/slices/appSlice"
import { trpc } from "../../utils/trpc"
import { useTheme } from "../shared"
import { CheckPin } from "./CheckPin"
import { EntryCard } from "./EntryCard"
import { SetPin } from "./SetPin"

export const HomeScreen: React.FC = () => {
  const isBlurred = useAppSelector((state) => state.app.isBlurred)
  const requiresPin = useAppSelector((state) => state.app.requiresPin)
  const [entriesLength, setEntriesLength] = useState<number>()
  const { data: userData } = trpc.user.useQuery()

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

  useEffect(() => {
    if (data) {
      const newLength = data.entries.length
      if (entriesLength !== undefined && newLength < entriesLength) {
        // reset editing state and scroll when entry is deleted
        dispatch(appActions.setEditingEntryId(null))
        window.scrollBy(0, 1)
      }
      setEntriesLength(newLength)
    }
  }, [data, entriesLength, dispatch])

  if (!userData) {
    return <></>
  }

  return (
    <motion.div
      style={{ backgroundColor: theme.background }}
      initial={false}
      animate={{ backgroundColor: theme.background }}
      className="min-h-screen w-screen"
    >
      <CheckPin />
      <SetPin />
      <motion.div animate={{ opacity: requiresPin ? 0 : 1 }}>
        {data?.entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </motion.div>
    </motion.div>
  )
}
