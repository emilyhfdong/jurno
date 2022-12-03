import { DateTime } from "luxon"
import resolveConfig from "tailwindcss/resolveConfig"
import _tailwindConfig from "../../tailwind.config.js"

export const getEntryStartEndTime = ({
  finishedAt,
  createdAt,
}: {
  createdAt: string
  finishedAt: string | null
}) => {
  const createdAtDatetime = DateTime.fromISO(createdAt)
  const finishedAtDatetime = finishedAt ? DateTime.fromISO(finishedAt) : null
  return `${createdAtDatetime.toFormat("h:mma")}${
    finishedAtDatetime ? ` - ${finishedAtDatetime.toFormat("h:mma")}` : ""
  }`
}

export const tailwindConfig = resolveConfig(_tailwindConfig) as any
