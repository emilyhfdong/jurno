import { Editor, EditorContent } from "@tiptap/react"
import React from "react"
import { useAppSelector } from "../../../../redux/hooks"
import { FadeAnimatePresence } from "../../../shared"

type EntryBodyProps = {
  editor: Editor | null
}

export const EntryBody: React.FC<EntryBodyProps> = ({ editor }) => {
  const isHidden = useAppSelector((state) => state.app.requiresPin)
  const isBlurred = useAppSelector((state) => state.app.isBlurred)

  return (
    <div className="mt-4 h-full overflow-hidden mx-[-1rem]">
      <div className="h-full overflow-hidden text-sm font-light flex-1 w-full relative px-4">
        {!isHidden && (
          <div
            className={`w-full h-full overflow-scroll ${
              isBlurred ? "blur-sm" : ""
            }`}
          >
            <div className="w-full md:h-full md:[&_div:first-child]:h-full [&_div:first-child]:w-full">
              <EditorContent editor={editor} />
            </div>
            <FadeAnimatePresence isVisible={!isHidden} delay={0.2}>
              <div className="absolute bottom-0 w-full h-10 bg-gradient-to-t from-white pointer-events-none" />
            </FadeAnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
