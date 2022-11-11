import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { Auth } from "@supabase/auth-ui-react"

export default function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <Auth supabaseClient={supabase} theme="dark" />
      ) : (
        <p>logged in</p>
      )}
    </div>
  )
}
