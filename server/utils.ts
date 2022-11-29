import { Database } from "../lib/database.types"
import { decrypt } from "./encrypt"

export const getDecriptedEntry = ({
  id,
  content,
  created_at,
  last_updated,
  title,
  finished_at,
}: Database["public"]["Tables"]["entries"]["Row"]) => {
  return {
    id,
    createdAt: created_at,
    lastUpdated: last_updated,
    content: content ? JSON.parse(decrypt(content)) : null,
    title: title ? decrypt(title) : null,
    finishedAt: finished_at,
  }
}
