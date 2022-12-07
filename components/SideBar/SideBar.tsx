import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import React from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../../redux/hooks"
import { appActions } from "../../redux/slices/appSlice"
import { trpc } from "../../utils/trpc"
import { useTheme } from "../shared"
import { getDefaultTitle } from "./utils"

type SideBarProps = {}

export const SideBar: React.FC<SideBarProps> = () => {
  const isBlurred = useAppSelector((state) => state.app.isBlurred)
  const requiresPin = useAppSelector((state) => state.app.requiresPin)
  const session = useSession()
  const client = useSupabaseClient()
  const router = useRouter()
  const theme = useTheme()
  const dispatch = useDispatch()
  const utils = trpc.useContext()

  const { mutate, isLoading } = trpc.addEntry.useMutation({
    onSuccess: ({ entry }) => {
      utils.allEntries.invalidate()
      document.body.scrollTop = document.documentElement.scrollTop = 0
      dispatch(appActions.setEditingEntryId(entry.id))
    },
  })

  return (
    <motion.div
      animate={{ borderColor: theme.border, color: theme.content }}
      className="flex fixed border border-grey top-4 md:top-8 left-4 md:left-8 w-8 md:w-16 bottom-4 md:bottom-8 flex-col items-center justify-end text-base z-10 py-2 md:py-6"
    >
      {!!session && (
        <>
          {!requiresPin && (
            <>
              <i
                onClick={() =>
                  !isLoading && mutate({ title: getDefaultTitle() })
                }
                className={`${
                  isLoading ? "ri-loader-line animate-spin-slow" : "ri-add-line"
                } mb-2 cursor-pointer`}
              ></i>
              <i
                onClick={() => dispatch(appActions.setIsBlurred(!isBlurred))}
                className={`ri-eye${
                  isBlurred ? "-off" : ""
                }-line mb-2 cursor-pointer`}
              ></i>
            </>
          )}
          <i
            className="ri-logout-box-line cursor-pointer"
            onClick={async () => {
              await client.auth.signOut()
              router.push("/login")
            }}
          ></i>
        </>
      )}
    </motion.div>
  )
}
