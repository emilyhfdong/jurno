import React, { useEffect, useRef, useState } from "react"
import { Editor } from "./Editor"
import { EntriesList } from "./EntriesList"

import { useAppSelector } from "../../redux/hooks"
import { GRID_CLASS_NAME, GRID_FORMATS } from "./gridUtils"
import { SidePanel } from "./SidePanel"

type HomeScreenProps = {}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  const ref = useRef<HTMLDivElement>(null)
  const activeEntry = useAppSelector((state) => state.app.activeEntry)

  const [bodyHeight, setBodyHeight] = useState<number>()

  useEffect(() => {
    const boundingRect = ref.current?.getBoundingClientRect()
    if (boundingRect && !bodyHeight) {
      setBodyHeight(boundingRect.height)
    }
  }, [ref, bodyHeight])

  return (
    <div ref={ref} className="relative flex flex-1 px-4">
      <div className="w-full">
        {activeEntry ? (
          <div
            style={{ height: (bodyHeight || 0) - 16 }}
            className={GRID_CLASS_NAME}
          >
            <div className={GRID_FORMATS[0][0] + " h-full w-full"}>
              <SidePanel />
            </div>
            <div className="h-full w-full row-span-2 col-span-5">
              <Editor initialEntry={activeEntry} />
            </div>
          </div>
        ) : (
          <EntriesList height={bodyHeight} />
        )}
      </div>
    </div>
  )
}
