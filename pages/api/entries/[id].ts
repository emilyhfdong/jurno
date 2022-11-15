import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import type { NextApiRequest, NextApiResponse } from "next"
import { Database } from "../../../lib/database.types"
import { decrypt, encrypt } from "../../../apiUtils"

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

  if (method === "PATCH") {
    const encryptedContent = encrypt(JSON.stringify(req.body.content))

    if (typeof req.query.id !== "string") {
      throw new Error("Missing required entry id")
    }

    const response = await client
      .from("entries")
      .update({
        id: req.query.id,
        user_id: user.id,
        content: encryptedContent,
        title: req.body.title ? encrypt(req.body.title) : null,
        created_at: req.body.createdAt,
      })
      .select("*")
      .single()

    const newEntry = response.data

    res.status(200).json({
      entry: {
        ...newEntry,
        content: newEntry?.content
          ? JSON.parse(decrypt(newEntry.content))
          : null,
        title: newEntry?.title ? decrypt(newEntry.title) : null,
      },
    })
    return
  }
  res.status(405).end(`Method ${method} Not Allowed`)
}
