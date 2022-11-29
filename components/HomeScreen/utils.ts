import { DateTime } from "luxon"
import { DATE_FORMAT } from "./constants"

export const getEntryStartEndDate = ({
  finishedAt,
  createdAt,
}: {
  createdAt: string
  finishedAt: string | null
}) => {
  const createdAtDatetime = DateTime.fromISO(createdAt)
  const finishedAtDatetime = finishedAt ? DateTime.fromISO(finishedAt) : null
  return `${createdAtDatetime.toFormat(
    DATE_FORMAT
  )} ${createdAtDatetime.toFormat("h:mma")}${
    finishedAtDatetime ? ` - ${finishedAtDatetime.toFormat("h:mma")}` : ""
  }`
}
