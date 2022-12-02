import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import React, { useEffect, useRef, useState } from "react"
import { Entry } from "../../types"
import { motion, useScroll } from "framer-motion"
import { AnimatedDate } from "./AnimatedDate/AnimatedDate"
import { getEntryStartEndTime } from "../utils"

type EntryCardProps = {
  entry: Entry
}
export const EntryCard: React.FC<EntryCardProps> = ({
  entry: { content, createdAt, title, finishedAt },
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false,
  })
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })

  useEffect(() => {
    if (isEditing) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "scroll"
    }
  }, [isEditing])

  return (
    <section className="flex h-screen w-full items-center snap-center justify-between pl-32 pr-8">
      <AnimatedDate
        isVisible={!isEditing}
        date={createdAt}
        scrollYProgress={scrollYProgress}
      />
      <div ref={ref}>{/* dummy div to calculate scroll position */}</div>
      <motion.div
        layout
        transition={{ type: "tween", ease: "easeInOut" }}
        initial={false}
        animate={{ width: isEditing ? "100%" : "70%" }}
        className="pt-32 pb-8 h-full py-8 "
      >
        <div className="flex border-b-4 h-full border-black px-4 py-8">
          <div className="mr-10 w-64">
            <div className="font-bold text-3xl ">{title}</div>
            <div className="font-thin pt-2 text-sm">
              {getEntryStartEndTime({
                createdAt,
                finishedAt,
              }).toLocaleLowerCase()}
            </div>
            <div
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center cursor-pointer mt-2"
            >
              {isEditing ? "Done" : "Edit"}
              <i className="ri-arrow-right-s-line"></i>
            </div>
          </div>

          <div className="flex text-base font-thin flex-1 w-full overflow-scroll relative">
            <EditorContent editor={editor} />
            <div className="absolute bottom-0 w-full h-6 bg-gradient-to-t from-white to-transparent" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
