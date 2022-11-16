import "../styles/globals.css"
import type { AppProps } from "next/app"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import { ReactNode, useState } from "react"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { ThemeProvider } from "@emotion/react"
import theme from "@rebass/preset"
import { ThemeContextProvider } from "../theme"

import React from "react"
import { Header } from "../components/shared"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Head from "next/head"
import type { AppType } from "next/app"
import { trpc } from "../utils/trpc"

const queryClient = new QueryClient()

const BasePage: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="bg-white min-h-screen font-sans flex flex-col text-sm">
      <Head>
        <title>jurno</title>
      </Head>
      <Header />
      {children}
    </div>
  )
}

const App: AppType = ({ Component, pageProps }: AppProps) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ThemeContextProvider>
          <SessionContextProvider
            supabaseClient={supabaseClient}
            initialSession={pageProps.initialSession}
          >
            <BasePage>
              <Component {...pageProps} />
            </BasePage>
          </SessionContextProvider>
        </ThemeContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default trpc.withTRPC(App)
