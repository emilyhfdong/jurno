import { Database } from "../../lib/database.types"

export type Entry = {
  id: string
  content: object | null
  createdAt: string
  lastUpdated: string
}

export type BackendEntry = Omit<
  Database["public"]["Tables"]["entries"]["Row"],
  "content"
> & { content: object | null }
