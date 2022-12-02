import { DateTime } from "luxon"

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
