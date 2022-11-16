import { initTRPC, TRPCError } from "@trpc/server"
import { Context } from "./context"

const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure

const isAuthed = t.middleware(async ({ ctx, next }) => {
  const user = ctx.user
  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }
  return next({
    ctx: { user },
  })
})

export const protectedProcedure = t.procedure.use(isAuthed)
