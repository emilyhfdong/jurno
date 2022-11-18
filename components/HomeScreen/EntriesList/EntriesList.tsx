import React from "react"
import { trpc } from "../../../utils/trpc"
import { GRID_FORMATS } from "../gridUtils"
import { SidePanel } from "../SidePanel"

import { EntryCard } from "./EntryCard"
import { getBatchedBoxes } from "./utils"

type EntriesListProps = {
  height: number | undefined
}

export const EntriesList: React.FC<EntriesListProps> = ({ height }) => {
  const { data } = trpc.allEntries.useQuery()

  const allBoxes = ["SIDEBAR", ...(data?.entries || [])]

  const batchedBoxes = getBatchedBoxes(allBoxes)

  return (
    <div className="pb-4">
      {batchedBoxes.map((boxes, batchIdx) => {
        return (
          <div
            key={batchIdx}
            style={{ height: (height || 0) - 16 }}
            className="grid w-full grid-cols-6 grid-rows-2 gap-4 pt-4"
          >
            {boxes.map((box, idx) => (
              <div
                key={idx}
                className={`${
                  GRID_FORMATS[batchIdx % 2][idx]
                } h-full w-full border border-black`}
              >
                {typeof box === "string" ? (
                  <SidePanel />
                ) : (
                  <EntryCard entry={box} />
                )}
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}
