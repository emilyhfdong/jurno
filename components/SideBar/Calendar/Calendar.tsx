import { DateTime } from "luxon"
import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../../../redux/hooks"
import { appActions } from "../../../redux/slices/appSlice"
import { trpc } from "../../../utils/trpc"

type CalendarProps = {}

const DAYS_OF_WEEK = ["S", "M", "T", "W", "T", "F", "S"]

export const Calendar: React.FC<CalendarProps> = () => {
  const calendarDate = useAppSelector((state) => state.app.calendarDate)
  const now = calendarDate ? DateTime.fromISO(calendarDate) : DateTime.now()
  const firstDayColStart = (now.startOf("month").weekday % 7) + 1
  const daysInMonth = now.daysInMonth
  const requiresPin = useAppSelector((state) => state.app.requiresPin)
  const { data } = trpc.allEntries.useQuery()
  const dispatch = useDispatch()

  const getHasEntryOnDay = useCallback(
    (day: number) =>
      data?.entries.some((entry) =>
        DateTime.fromISO(entry.createdAt).hasSame(
          DateTime.fromObject({
            year: now.year,
            month: now.month,
            day,
          }),
          "day"
        )
      ),
    [data, now]
  )

  const getIsCurrentEntryDate = useCallback(
    (day: number) => {
      if (!calendarDate) {
        return false
      }
      return DateTime.fromObject({
        year: now.year,
        month: now.month,
        day,
      }).hasSame(DateTime.fromISO(calendarDate), "day")
    },
    [calendarDate, now]
  )

  const getIsToday = useCallback(
    (day: number) => {
      return DateTime.fromObject({
        year: now.year,
        month: now.month,
        day,
      }).hasSame(DateTime.now(), "day")
    },
    [now]
  )

  if (requiresPin) {
    return null
  }

  return (
    <div className="w-full text-xs">
      <div className="text-center mb-2 font-semibold flex items-center justify-between px-2">
        <i
          className="ri-arrow-left-s-line cursor-pointer"
          onClick={() =>
            dispatch(
              appActions.setCalendarDate(now.minus({ month: 1 }).toISODate())
            )
          }
        ></i>
        <p>
          {now.monthLong} {now.year}
        </p>
        <i
          className="ri-arrow-right-s-line cursor-pointer"
          onClick={() =>
            dispatch(
              appActions.setCalendarDate(now.plus({ month: 1 }).toISODate())
            )
          }
        ></i>
      </div>
      <div className="w-full grid grid-cols-7 grid-rows-6  max-sm:hidden px-1">
        {DAYS_OF_WEEK.map((weekDay, idx) => (
          <p
            key={idx}
            className="flex items-center justify-center mb-1 font-thin "
          >
            {weekDay}
          </p>
        ))}
        {new Array(daysInMonth).fill(0).map((_, idx) => {
          const isCurrentEntryDate = getIsCurrentEntryDate(idx + 1)
          const isToday = getIsToday(idx + 1)
          return (
            <div
              className={` ${
                isCurrentEntryDate
                  ? "text-white font-bold"
                  : isToday
                  ? "text-red font-bold"
                  : "text-black"
              } flex flex-col items-center justify-center mb-2 relative ${
                idx === 0 ? `col-start-${firstDayColStart}` : ""
              }`}
              key={idx}
            >
              <p className="">{idx + 1}</p>
              <p
                className={`leading-[5px] mt-[-2px] pb-[2px] font-bold ${
                  getHasEntryOnDay(idx + 1) ? "opacity-100" : "opacity-0"
                }`}
              >
                •
              </p>
              {isCurrentEntryDate && (
                <div className="absolute h-6 w-6 rounded-full  bg-black -z-10" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
