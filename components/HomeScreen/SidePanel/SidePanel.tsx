import React from "react"
import { DateTime } from "luxon"
import { Entry } from "../../types"
import { trpc } from "../../../utils/trpc"

type SidePanelProps = {
  onAddNewEntry: (entry: Entry) => void
}

export const SidePanel: React.FC<SidePanelProps> = ({ onAddNewEntry }) => {
  const todaysDate = DateTime.now()

  const { mutate } = trpc.addEntry.useMutation({
    onSuccess: ({ entry }) => onAddNewEntry(entry),
  })

  return (
    <div className="flex flex-1 flex-col border border-black p-4 bg-black text-white justify-between">
      <div className="flex flex-1 flex-col">
        <p className="font-serif text-2xl">{todaysDate.weekdayLong}</p>
        <p className="text-xs mt-1">{todaysDate.toFormat("MMM d, yyyy")}</p>
      </div>
      <div className="flex p-1 justify-end">
        <button
          onClick={() => mutate()}
          className="bg-white text-black rounded-none h-[30px] w-[30px] rotate-45 cursor-pointer"
        >
          <div className="rotate-45">
            <i className="ri-add-line md:transform-none font-semibold"></i>
          </div>
        </button>
      </div>
    </div>
  )
}
