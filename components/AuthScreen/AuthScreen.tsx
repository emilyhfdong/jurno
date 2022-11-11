import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Auth, ThemeSupa, ThemeMinimal } from "@supabase/auth-ui-react"
import React from "react"
import { Flex, Text } from "rebass"
import { useThemeContext } from "../../theme"

type AuthScreenProps = {}

export const AuthScreen: React.FC<AuthScreenProps> = () => {
  const theme = useThemeContext()
  const client = useSupabaseClient()
  return (
    <Flex
      sx={{
        backgroundColor: theme.background.primary,
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: theme.fonts.sansSerif,
      }}
    >
      <Flex
        sx={{
          padding: "12px",
          flexDirection: "column",
          width: "40vw",
        }}
      >
        <Text sx={{ fontSize: "36px", marginBottom: "24px" }}>
          Welcome back
        </Text>
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
                width: "40vw",
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
      </Flex>
    </Flex>
  )
}
