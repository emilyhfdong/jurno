import "../styles/globals.css"
import type { AppProps } from "next/app"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import { ReactNode, useState } from "react"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"

import React from "react"
import { Header } from "../components/shared"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Head from "next/head"
import type { AppType } from "next/app"
import { trpc } from "../utils/trpc"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Provider } from "react-redux"
import { store } from "../redux/store"

const queryClient = new QueryClient()

const BasePage: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-sm">
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
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={pageProps.initialSession}
        >
          <BasePage>
            <Component {...pageProps} />
          </BasePage>
        </SessionContextProvider>
      </QueryClientProvider>
    </Provider>
  )
}

export default trpc.withTRPC(App)
