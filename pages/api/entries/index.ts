import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import type { NextApiRequest, NextApiResponse } from "next"
import { decrypt } from "../../../apiUtils"
import { Database } from "../../../lib/database.types"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  const client = createServerSupabaseClient<Database>({
    req,
    res,
  })

  const {
    data: { user },
  } = await client.auth.getUser()

  if (!user) {
    res.status(401).end("Not authorized")
    return
  }

  if (method === "POST") {
    const response = await client
      .from("entries")
      .insert({ user_id: user.id })
      .select("*")
      .single()

    if (response.error) {
      res.status(500).end(response.error.message)
      return
    }

    res.status(200).json({ entry: response.data })
    return
  }

  if (method === "GET") {
    const response = await client
      .from("entries")
      .select("*")
      .eq("user_id", user.id)

    res.status(200).json({
      entries:
        response.data?.map((entry) => ({
          ...entry,
          content: entry.content ? JSON.parse(decrypt(entry.content)) : null,
          title: entry.title ? decrypt(entry.title) : null,
        })) || [],
    })
    return
  }

  res.status(405).end(`Method ${method} Not Allowed`)
}
