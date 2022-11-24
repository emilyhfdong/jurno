import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import React from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../../redux/hooks"
import { appActions } from "../../redux/slices/appSlice"
import { Button } from "./Button"
import { StarIcon } from "./StarIcon"

type HeaderProps = {}

export const Header: React.FC<HeaderProps> = () => {
  const session = useSession()
  const client = useSupabaseClient()
  const router = useRouter()
  const dispatch = useDispatch()

  const isBlurred = useAppSelector((state) => state.app.isBlurred)

  return (
    <div className="sticky top-0 left-0 right-0 z-10 flex h-20 items-center justify-between border-b border-black bg-white px-6">
      <StarIcon />
      <p className="text-xs font-medium tracking-widest">jurno</p>
      <div className="flex items-center ">
        <i
          onClick={() => dispatch(appActions.setIsBlurred(!isBlurred))}
          className={`ri-eye${
            isBlurred ? "-off" : ""
          }-line mr-4 cursor-pointer`}
        ></i>

        {session ? (
          <Button
            onClick={async () => {
              await client.auth.signOut()
              router.push("/login")
            }}
            text="log out"
          />
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
