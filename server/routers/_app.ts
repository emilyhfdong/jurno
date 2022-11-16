import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { encrypt } from "../encrypt"
import { protectedProcedure, router } from "../trpc"
import { getDecriptedEntry } from "../utils"

export const appRouter = router({
  allEntries: protectedProcedure.query(async ({ ctx: { client, user } }) => {
    const response = await client
      .from("entries")
      .select("*")
      .eq("user_id", user.id)

    return {
      entries: response.data?.map(getDecriptedEntry) || [],
    }
  }),
  addEntry: protectedProcedure.mutation(async ({ ctx: { client, user } }) => {
    const response = await client
      .from("entries")
      .insert({ user_id: user.id })
      .select("*")
      .single()

    if (response.error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: response.error.message,
      })
    }
    return { entry: getDecriptedEntry(response.data) }
  }),
  updateEntry: protectedProcedure
    .input(
      z.object({
        content: z.object({}).passthrough(),
        id: z.string(),
        title: z.string().optional(),
      })
    )
    .mutation(
      async ({ ctx: { client, user }, input: { content, id, title } }) => {
        const encryptedContent = encrypt(JSON.stringify(content))
        const response = await client
          .from("entries")
          .update({
            id,
            user_id: user.id,
            content: encryptedContent,
            title: title ? encrypt(title) : null,
          })
          .select("*")
          .single()

        const newEntry = response.data

        if (!newEntry) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
        }
        return { entry: getDecriptedEntry(newEntry) }
      }
    ),
})

export type AppRouter = typeof appRouter
