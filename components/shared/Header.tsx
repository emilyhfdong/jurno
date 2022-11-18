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
    <div className="sticky top-0 left-0 right-0 z-10 flex h-20 items-center justify-between border-b border-black bg-white px-6">
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
