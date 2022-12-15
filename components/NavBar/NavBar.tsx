import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import React from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../../redux/hooks"
import { appActions } from "../../redux/slices/appSlice"
import { trpc } from "../../utils/trpc"
import { EDIT_MODE_TRANSITION } from "../HomeScreen/EntryCard/utils"
import { BREAKPOINTS, useScreenWidth, useTheme } from "../shared"
import { ToolBar } from "./ToolBar"
import { getDefaultTitle } from "./utils"

type NavBarProps = {}

export const NavBar: React.FC<NavBarProps> = () => {
  const isEditing = useAppSelector((state) => !!state.app.editingEntryId)
  const requiresPin = useAppSelector((state) => state.app.requiresPin)
  const isBlurred = useAppSelector((state) => state.app.isBlurred)
  const session = useSession()
  const client = useSupabaseClient()
  const router = useRouter()
  const theme = useTheme()

  const screenWidth = useScreenWidth()
  const isMobile = screenWidth <= BREAKPOINTS.md

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
      transition={EDIT_MODE_TRANSITION}
      animate={{
        height: isEditing ? "3rem" : isMobile ? "2rem" : "4rem",
        borderColor: theme.border,
        color: theme.content,
      }}
      className={`fixed border h-8 md:h-16 border-grey top-4 md:top-8 left-4 md:left-8 right-4 md:right-8 z-10 flex items-center justify-between pr-4 pl-6 md:pl-44`}
    >
      {isEditing ? <ToolBar /> : <div />}
      <div className="flex items-center gap-3 max-sm:hidden">
        {!!session && (
          <>
            {!requiresPin && (
              <>
                <i
                  onClick={() =>
                    !isLoading && mutate({ title: getDefaultTitle() })
                  }
                  className={`${
                    isLoading
                      ? "ri-loader-line animate-spin-slow"
                      : "ri-add-line"
                  } cursor-pointer`}
                ></i>
                <i
                  onClick={() => dispatch(appActions.setIsBlurred(!isBlurred))}
                  className={`ri-eye${
                    isBlurred ? "-off" : ""
                  }-line cursor-pointer`}
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
      </div>
    </motion.div>
  )
}
