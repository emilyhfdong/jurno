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

  const durationMinutes = Math.ceil(
    finishedAtDatetime?.diff(createdAtDatetime).as("minutes") || 0
  )

  const formattedDuration = durationMinutes
    ? durationMinutes < 60
      ? `${durationMinutes}m`
      : `${Math.ceil(durationMinutes / 60)}h ${Math.ceil(
          durationMinutes % 60
        )}m`
    : "0m"

  return `${createdAtDatetime.toFormat("h:mma")}${
    finishedAtDatetime
      ? ` - ${finishedAtDatetime.toFormat("h:mma")} [${formattedDuration}]`
      : ""
  }`
}
