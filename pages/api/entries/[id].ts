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
    console.log("hii", req.query)

    if (typeof req.query.id !== "string") {
      throw new Error("Missing required entry id")
    }

    const response = await client
      .from("entries")
      .update({
        id: req.query.id,
        user_id: user.id,
        content: encryptedContent,
        created_at: req.body.createdAt,
      })
      .select("*")
      .single()

    res.status(200).json({
      entry: {
        ...response.data,
        content: JSON.parse(decrypt(response.data?.content || "")),
      },
    })
    return
  }
  res.status(405).end(`Method ${method} Not Allowed`)
}
