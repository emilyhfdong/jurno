import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import React, { useRef } from "react"
import { Entry } from "../../types"
import { useScroll } from "framer-motion"
import { AnimatedDate } from "./AnimatedDate/AnimatedDate"
import { getEntryStartEndTime } from "../utils"

type EntryCardProps = {
  entry: Entry
}
export const EntryCard: React.FC<EntryCardProps> = ({
  entry: { content, createdAt, title, finishedAt },
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false,
  })
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })

  return (
    <section className="flex h-screen items-center snap-center justify-between pl-32 pr-8">
      <AnimatedDate date={createdAt} scrollYProgress={scrollYProgress} />
      <div ref={ref}>{/* dummy div to calculate scroll position */}</div>
      <div className="pt-32 pb-8 w-[70%] h-full py-8 ">
        <div className="flex border-b-4 h-full border-black px-4 py-8">
          <div className="w-[30%] mr-10  ">
            <div className="font-bold text-3xl ">{title}</div>
            <div className="font-thin pt-2 text-sm">
              {getEntryStartEndTime({
                createdAt,
                finishedAt,
              }).toLocaleLowerCase()}
            </div>
            <div className="flex items-center cursor-pointer mt-2">
              Edit<i className="ri-arrow-right-s-line"></i>
            </div>
          </div>

          <div className="flex text-base font-thin flex-1 w-full overflow-scroll relative">
            <EditorContent editor={editor} />
            <div className="absolute bottom-0 w-full h-6 bg-gradient-to-t from-white to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
