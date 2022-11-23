import React, { useEffect, useRef, useState } from "react"
import { Editor } from "./Editor"
import { EntriesList } from "./EntriesList"

import { useAppSelector } from "../../redux/hooks"
import { GRID_CLASS_NAME, GRID_FORMATS } from "./gridUtils"
import { SidePanel } from "./SidePanel"
import { trpc } from "../../utils/trpc"
import { SetUpPin } from "./SetUpPin"
import { CheckPin } from "./CheckPin"

type HomeScreenProps = {}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  const ref = useRef<HTMLDivElement>(null)
  const activeEntry = useAppSelector((state) => state.app.activeEntry)
  const [isHidden, setIsHidden] = useState(true)

  const { data, isLoading } = trpc.user.useQuery()

  const [bodyHeight, setBodyHeight] = useState<number>()

  useEffect(() => {
    if (data?.user && !data.user.hasPin) {
      setIsHidden(false)
    }
  }, [data])

  useEffect(() => {
    const boundingRect = ref.current?.getBoundingClientRect()
    if (boundingRect && !bodyHeight) {
      setBodyHeight(boundingRect.height)
    }
  }, [ref, bodyHeight])

  useEffect(() => {
    const onBlur = () => {
      setIsHidden(true)
    }
    window.addEventListener("blur", onBlur)
    return () => window.removeEventListener("blur", onBlur)
  }, [])

  return (
    <div ref={ref} className="relative flex flex-1 px-4 ">
      {isHidden && <CheckPin onSuccess={() => setIsHidden(false)} />}
      {!isLoading && !data?.user.hasPin && <SetUpPin />}
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
