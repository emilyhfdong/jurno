import React, { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../../redux/hooks"
import { appActions } from "../../redux/slices/appSlice"
import { CheckPin } from "./CheckPin"
import { Editor } from "./Editor"
import { EntriesList } from "./EntriesList"
import { GRID_CLASS_NAME, GRID_FORMATS } from "./gridUtils"
import { SidePanel } from "./SidePanel"

type DashboardProps = {}

export const Dashboard: React.FC<DashboardProps> = () => {
  const ref = useRef<HTMLDivElement>(null)
  const activeEntry = useAppSelector((state) => state.app.activeEntry)
  const requiresPin = useAppSelector((state) => state.app.requiresPin)
  const dispatch = useDispatch()

  const [bodyHeight, setBodyHeight] = useState<number>()

  useEffect(() => {
    const boundingRect = ref.current?.getBoundingClientRect()
    if (boundingRect && !bodyHeight) {
      setBodyHeight(boundingRect.height)
    }
  }, [ref, bodyHeight])

  useEffect(() => {
    const onBlur = () => {
      dispatch(appActions.setRequiresPin(true))
    }
    window.addEventListener("blur", onBlur)
    return () => window.removeEventListener("blur", onBlur)
  }, [dispatch])

  return (
    <div ref={ref} className="relative flex flex-1 px-4 ">
      {requiresPin && <CheckPin />}
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
