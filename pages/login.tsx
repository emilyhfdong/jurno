import { useSession } from "@supabase/auth-helpers-react"
import Router from "next/router"
import React from "react"
import { AuthScreen } from "../components"

type LoginProps = {}

export const Login: React.FC<LoginProps> = () => {
  const session = useSession()
  if (session) {
    Router.push("/")
    return <></>
  }
  return <AuthScreen />
}

export default Login
