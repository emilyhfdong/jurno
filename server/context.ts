import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { inferAsyncReturnType } from "@trpc/server"
import { CreateNextContextOptions } from "@trpc/server/adapters/next"
import { Database } from "../lib/database.types"

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  const client = createServerSupabaseClient<Database>({
    req,
    res,
  })

  const {
    data: { user },
  } = await client.auth.getUser()

  return { user, client }
}

export type Context = inferAsyncReturnType<typeof createContext>
