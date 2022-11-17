import { TRPCError } from "@trpc/server"
import { DateTime } from "luxon"
import { z } from "zod"
import { encrypt } from "../encrypt"
import { protectedProcedure, router } from "../trpc"
import { getDecriptedEntry } from "../utils"

const getTimeOfDay = (dateTime: DateTime) => {
  const hour = dateTime.hour
  if (hour < 6) {
    return "Early morning"
  }

  if (hour < 12) {
    return "Morning"
  }

  if (hour < 18) {
    return "Afternoon"
  }

  return "Evening"
}

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
    const date = DateTime.now()

    const title = `${date.weekdayLong} ${getTimeOfDay(date)} Entry`
    const response = await client
      .from("entries")
      .insert({ user_id: user.id, title: encrypt(title) })
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
        id: z.string().uuid(),
        content: z.object({}).passthrough().optional(),
        title: z.string().optional(),
      })
    )
    .mutation(
      async ({ ctx: { client, user }, input: { content, id, title } }) => {
        const response = await client
          .from("entries")
          .update({
            id,
            user_id: user.id,
            ...(content && { content: encrypt(JSON.stringify(content)) }),
            ...(title && { title: encrypt(title) }),
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
  deleteEntry: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx: { client }, input: { id } }) => {
      const response = await client
        .from("entries")
        .delete()
        .eq("id", id)
        .select("*")

      if (response.error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: response.error.message,
        })
      }

      return { success: true }
    }),
})

export type AppRouter = typeof appRouter
