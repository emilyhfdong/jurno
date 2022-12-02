import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../../redux/hooks"
import { appActions } from "../../redux/slices/appSlice"
import { trpc } from "../../utils/trpc"
import { EntryCard } from "./EntryCard"
import { EDIT_MODE_TRANSITION } from "./EntryCard/utils"

export const HomeScreen: React.FC = () => {
  const { data } = trpc.allEntries.useQuery()
  const client = useSupabaseClient()
  const router = useRouter()
  const dispatch = useDispatch()

  const session = useSession()

  const isEditing = useAppSelector((state) => !!state.app.editingEntryId)
  const isBlurred = useAppSelector((state) => state.app.isBlurred)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.code === "KeyB") {
        dispatch(appActions.setIsBlurred(!isBlurred))
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [dispatch, isBlurred])

  return (
    <div>
      <div className="fixed border border-black top-8 left-8 w-16 bottom-8 bg-white flex flex-col items-center justify-end p-6 text-base">
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
      </div>
      <motion.div
        transition={EDIT_MODE_TRANSITION}
        animate={{
          height: isEditing ? 0 : "4rem",
          borderBottomWidth: isEditing ? 0 : 1,
        }}
        className={`fixed border border-black  top-8 left-8 right-8 `}
      ></motion.div>
      {data?.entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  )
}
