import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import React from "react"
import { Button } from "./Button"
import { StarIcon } from "./StarIcon"

type HeaderProps = {}

export const Header: React.FC<HeaderProps> = () => {
  const session = useSession()
  const client = useSupabaseClient()
  const router = useRouter()
  return (
    <div className="h-20 border-b border-black flex items-center justify-between px-6">
      <StarIcon />
      <p className="text-xs font-medium tracking-widest">jurno</p>
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
  )
}
