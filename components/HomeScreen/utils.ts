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

  const durationMinutes = Math.floor(
    finishedAtDatetime?.diff(createdAtDatetime).as("minutes") || 0
  )

  const formattedDuration = durationMinutes
    ? durationMinutes < 60
      ? `${durationMinutes}m`
      : `${Math.floor(durationMinutes / 60)}h ${Math.floor(
          durationMinutes % 60
        )}m`
    : ""

  return `${createdAtDatetime.toFormat("h:mma")}${
    finishedAtDatetime
      ? ` - ${finishedAtDatetime.toFormat("h:mma")} [${formattedDuration}]`
      : ""
  }`
}
