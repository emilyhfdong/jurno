import "../styles/globals.css"
import type { AppProps } from "next/app"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import { ReactNode, useState } from "react"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"

import React from "react"
import Head from "next/head"
import type { AppType } from "next/app"
import { trpc } from "../utils/trpc"
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Provider } from "react-redux"
import { store } from "../redux/store"
import { NavBar } from "../components/NavBar"
import { SideBar } from "../components/SideBar"

const BasePage: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-sm">
      <Head>
        <title>jurno</title>
      </Head>
      <NavBar />
      <SideBar />
      {children}
    </div>
  )
}

const App: AppType = ({ Component, pageProps }: AppProps) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <Provider store={store}>
      {/* <ReactQueryDevtools /> */}
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <BasePage>
          <Component {...pageProps} />
        </BasePage>
      </SessionContextProvider>
    </Provider>
  )
}

export default trpc.withTRPC(App)
