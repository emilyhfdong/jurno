import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { decrypt, encrypt } from "../encrypt"
import { protectedProcedure, router } from "../trpc"
import { getDecriptedEntry } from "../utils"

export const appRouter = router({
  allEntries: protectedProcedure.query(async ({ ctx: { client, user } }) => {
    const response = await client
      .from("entries")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    return {
      entries: response.data?.map(getDecriptedEntry) || [],
    }
  }),
  addEntry: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx: { client, user }, input: { title } }) => {
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
    .mutation(async ({ ctx: { client }, input: { content, id, title } }) => {
      const response = await client
        .from("entries")
        .update({
          id,
          ...(content && { content: encrypt(JSON.stringify(content)) }),
          ...(title && { title: encrypt(title) }),
          last_updated: new Date().toISOString().toLocaleString(),
        })
        .select("*")
        .single()

      const entry = response.data

      if (!entry) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
      }
      return { entry: getDecriptedEntry(entry) }
    }),
  finishEntry: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx: { client }, input: { id } }) => {
      const response = await client
        .from("entries")
        .update({
          id,
          finished_at: new Date().toISOString().toLocaleString(),
        })
        .select("*")
        .single()

      const entry = response.data

      if (!entry) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
      }
      return { entry: getDecriptedEntry(entry) }
    }),
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
  updatePin: protectedProcedure
    .input(z.object({ pin: z.string().regex(/^\d+$/).length(4) }))
    .mutation(async ({ ctx: { client, user }, input: { pin } }) => {
      const response = await client
        .from("users")
        .update({ pin: encrypt(pin), id: user.id })
      if (response.error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: response.error.message,
        })
      }
      return { success: true }
    }),
  checkPin: protectedProcedure
    .input(z.object({ pin: z.string().regex(/^\d+$/).length(4) }))
    .mutation(async ({ ctx: { client, user }, input: { pin } }) => {
      const response = await client
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single()
      if (response.error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: response.error.message,
        })
      }

      if (!response.data.pin) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User has not set up pin",
        })
      }
      return { correct: pin === decrypt(response.data.pin) }
    }),
  user: protectedProcedure.query(async ({ ctx: { client, user } }) => {
    const response = await client
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single()

    if (!response.data) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: response.error.message,
      })
    }
    return {
      user: {
        id: response.data.id,
        hasPin: !!response.data.pin,
      },
    }
  }),
})

export type AppRouter = typeof appRouter
