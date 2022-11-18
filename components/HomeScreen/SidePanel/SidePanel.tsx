import React from "react"
import { DateTime } from "luxon"
import { trpc } from "../../../utils/trpc"
import { useDispatch } from "react-redux"
import { appActions } from "../../../redux/slices/appSlice"

type SidePanelProps = {
}

export const SidePanel: React.FC<SidePanelProps> = () => {
  const todaysDate = DateTime.now()
  const dispatch = useDispatch()

  const { mutate } = trpc.addEntry.useMutation({
    onSuccess: ({ entry }) => dispatch(appActions.setActiveEntry(entry)),
  })

  return (
    <div className="flex h-full flex-1 flex-col justify-between border border-black bg-black p-4 text-white">
      <div className="flex flex-1 flex-col">
        <p className="font-serif text-2xl">{todaysDate.weekdayLong}</p>
        <p className="mt-1 text-xs">{todaysDate.toFormat("MMM d, yyyy")}</p>
      </div>
      <div className="flex justify-end p-1">
        <button
          onClick={() => mutate()}
          className="h-[30px] w-[30px] rotate-45 cursor-pointer rounded-none bg-white text-black"
        >
          <div className="rotate-45">
            <i className="ri-add-line font-semibold md:transform-none"></i>
          </div>
        </button>
      </div>
    </div>
  )
}
