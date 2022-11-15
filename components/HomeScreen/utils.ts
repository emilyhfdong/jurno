import { BackendEntry, Entry } from "./types"

export const transformBackendEntry = ({
  content,
  created_at,
  id,
  last_updated,
}: BackendEntry): Entry => ({
  id,
  content,
  createdAt: created_at,
  lastUpdated: last_updated,
})
