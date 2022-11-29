import type { inferRouterOutputs } from "@trpc/server"
import { AppRouter } from "../server/routers/_app"

type RouterOutput = inferRouterOutputs<AppRouter>

export type Entry = RouterOutput["allEntries"]["entries"][0]
