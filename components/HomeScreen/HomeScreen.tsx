import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../../redux/hooks"
import { appActions } from "../../redux/slices/appSlice"
import { trpc } from "../../utils/trpc"
import { CheckPin } from "./CheckPin"
import { EntryCard } from "./EntryCard"
import { EDIT_MODE_TRANSITION } from "./EntryCard/utils"
import { tailwindConfig } from "./utils"

export const HomeScreen: React.FC = () => {
  const { data } = trpc.allEntries.useQuery()
  const client = useSupabaseClient()
  const router = useRouter()
  const dispatch = useDispatch()

  const session = useSession()

  const isEditing = useAppSelector((state) => !!state.app.editingEntryId)
  const isBlurred = useAppSelector((state) => state.app.isBlurred)
  const requiresPin = useAppSelector((state) => state.app.requiresPin)

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

  const { black, white, grey } = tailwindConfig.theme.colors

  return (
    <motion.div
      style={{ backgroundColor: black }}
      initial={false}
      animate={{
        backgroundColor: requiresPin ? black : white,
      }}
      className="h-screen w-screen"
    >
      <motion.div
        animate={{
          borderColor: requiresPin ? grey : black,
          color: requiresPin ? white : black,
        }}
        className="fixed border border-grey top-8 left-8 w-16 bottom-8 flex flex-col items-center justify-end p-6 text-base z-10"
      >
        <i
          onClick={() => dispatch(appActions.setIsBlurred(!isBlurred))}
          className={`ri-eye${
            isBlurred ? "-off" : ""
          }-line mb-2 cursor-pointer`}
        ></i>
        {!!session && (
          <i
            className="ri-logout-box-line cursor-pointer"
            onClick={async () => {
              await client.auth.signOut()
              router.push("/login")
            }}
          ></i>
        )}
      </motion.div>
      <motion.div
        transition={EDIT_MODE_TRANSITION}
        animate={{
          height: isEditing ? 0 : "4rem",
          borderBottomWidth: isEditing ? 0 : 1,
          borderColor: requiresPin ? grey : black,
        }}
        className={`fixed border h-16 border-grey top-8 left-8 right-8 z-10`}
      ></motion.div>
      <CheckPin />
      <motion.div animate={{ opacity: requiresPin ? 0 : 1 }}>
        {data?.entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </motion.div>
    </motion.div>
  )
}
