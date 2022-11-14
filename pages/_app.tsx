import "../styles/globals.css"
import type { AppProps } from "next/app"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import { ReactNode, useState } from "react"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { ThemeProvider } from "@emotion/react"
import theme from "@rebass/preset"
import { ThemeContextProvider, useThemeContext } from "../theme"

import React from "react"
import { Box, Flex } from "rebass"
import { Header } from "../components/shared"

const Page: React.FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useThemeContext()

  return (
    <Flex
      sx={{
        backgroundColor: theme.colors.background,
        minHeight: "100vh",
        fontFamily: theme.fonts.sansSerif,
        paddingTop: 0,
        flexDirection: "column",
        fontSize: 14,
      }}
    >
      <Header />
      {children}
    </Flex>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <ThemeProvider theme={theme}>
      <ThemeContextProvider>
        <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={pageProps.initialSession}
        >
          <Page>
            <Component {...pageProps} />
          </Page>
        </SessionContextProvider>
      </ThemeContextProvider>
    </ThemeProvider>
  )
}
