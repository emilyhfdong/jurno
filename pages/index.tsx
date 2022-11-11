import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { GetServerSideProps } from "next"

import React from "react"
import { AuthSession } from "@supabase/supabase-js"
import { HomeScreen } from "../components"

type HomeProps = {
  initialSession: AuthSession
}

export const Home: React.FC<HomeProps> = () => {
  return <HomeScreen />
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const supabase = createServerSupabaseClient(context)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }

  return {
    props: {
      initialSession: session,
    },
  }
}
export default Home
