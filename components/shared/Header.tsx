import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import React from "react"
import { Box, Flex, Text } from "rebass"
import { Button } from "./Button"
import { useThemeContext } from "../../theme"
import { StarIcon } from "./StarIcon"

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
        borderBottom: `1.5px solid ${theme.colors.content}`,
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
          text="log out"
        />
      ) : (
        <Box />
      )}
    </Flex>
  )
}
