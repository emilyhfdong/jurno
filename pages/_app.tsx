import "../styles/globals.css"
import type { AppProps } from "next/app"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import { ReactNode, useState } from "react"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { ThemeProvider } from "@emotion/react"
import theme from "@rebass/preset"
import { ThemeContextProvider, useThemeContext } from "../theme"

import React from "react"
import { Flex } from "rebass"
import { Header } from "../components/shared"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Head from "next/head"

const queryClient = new QueryClient()

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
      <Head>
        <title>jurno</title>
      </Head>
      <Header />
      {children}
    </Flex>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}
