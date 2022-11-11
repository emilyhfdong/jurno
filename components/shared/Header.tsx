import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import React from "react"
import { Box, Button, Flex, Text } from "rebass"
import { StarIcon } from "."
import { useThemeContext } from "../../theme"

type HeaderProps = {}

export const Header: React.FC<HeaderProps> = () => {
  const theme = useThemeContext()
  const session = useSession()
  const client = useSupabaseClient()
  const router = useRouter()
  return (
    <Flex
      sx={{
        height: "70px",
        borderBottom: `1.5px solid ${theme.content.primary}`,
        paddingX: "24px",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <StarIcon />
      <Text
        sx={{
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "1.5px",
        }}
      >
        jurno
      </Text>
      {session ? (
        <Button
          onClick={async () => {
            await client.auth.signOut()
            router.push("/login")
          }}
          sx={{
            cursor: "pointer",
            backgroundColor: theme.content.primary,
            color: theme.background.primary,
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "1.5px",
            borderRadius: 0,
            ":hover": {
              opacity: 0.8,
            },
          }}
        >
          log out
        </Button>
      ) : (
        <Box />
      )}
    </Flex>
  )
}
