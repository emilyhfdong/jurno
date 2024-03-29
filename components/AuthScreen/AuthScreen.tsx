import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Auth, ThemeMinimal } from "@supabase/auth-ui-react"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { appActions } from "../../redux/slices/appSlice"

type AuthScreenProps = {}

export const AuthScreen: React.FC<AuthScreenProps> = () => {
  const client = useSupabaseClient()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(appActions.setRequiresPin(false))
  }, [dispatch])

  return (
    <div className="flex flex-1 justify-center items-center font-sans pt-16 pl-16 pr-8 md:p-0">
      <div className="flexflex-col p4 w-100 md:w-[60vw] lg:w-[40vw] xl-[50vw]">
        <p className="text-3xl mb-6 font-bold">Welcome back</p>
        <Auth
          supabaseClient={client}
          appearance={{
            theme: ThemeMinimal,
            style: {
              button: { padding: "8px", marginTop: "16px" },
              container: { width: "100%" },
              input: {
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                padding: "8px",
                width: "100%",
                marginBottom: "16px",
              },
              label: { display: "none" },
              anchor: { fontSize: 12 },
            },
          }}
          localization={{
            variables: {
              sign_in: {
                email_input_placeholder: "Email address",
                password_input_placeholder: "Password",
              },
              sign_up: {
                email_input_placeholder: "Email address",
                password_input_placeholder: "Password",
              },
            },
          }}
        />
      </div>
    </div>
  )
}
