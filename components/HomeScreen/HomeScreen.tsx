import React, { useState } from "react"
import { Editor } from "./Editor"
import { EntriesList } from "./EntriesList"
import { SidePanel } from "./SidePanel"
import { Entry } from "../types"

type HomeScreenProps = {}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  const [activeEntry, setActiveEntry] = useState<Entry | null>(null)

  return (
    <div className="flex my-4 flex-1 gap-4 px-4">
      <div className="flex flex-1">
        <SidePanel onAddNewEntry={setActiveEntry} />
      </div>
      <div className="flex flex-[4]">
        {activeEntry ? <Editor initialEntry={activeEntry} /> : <EntriesList />}
      </div>
    </div>
  )
}
