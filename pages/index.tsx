import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { GetServerSideProps } from "next"

import React from "react"
import { AuthSession } from "@supabase/supabase-js"

type HomeProps = {
  initialSession: AuthSession
}

export const Home: React.FC<HomeProps> = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return <p>logged in</p>
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
