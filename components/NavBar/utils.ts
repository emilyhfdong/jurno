import { DateTime } from "luxon"

export const getDefaultTitle = () => {
  const date = DateTime.now()

  const getTimeOfDay = () => {
    const hour = date.hour
    if (hour < 6) {
      return "Early Morning"
    }

    if (hour < 12) {
      return "Morning"
    }

    if (hour < 18) {
      return "Afternoon"
    }

    return "Evening"
  }

  return `${date.weekdayLong} ${getTimeOfDay()}`
}
