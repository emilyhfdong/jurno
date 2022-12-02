import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import React, { useRef } from "react"
import { Entry } from "../../types"
import { useScroll } from "framer-motion"
import { AnimatedDate } from "./AnimatedDate/AnimatedDate"

type EntryCardProps = {
  entry: Entry
}
export const EntryCard: React.FC<EntryCardProps> = ({
  entry: { content, createdAt, title },
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
      <div ref={ref}></div>
      <div className="pt-32 pb-8 w-[65%] h-full  py-8 ">
        <div className="flex border-b-4 h-full border-black pt-4">
          <div className="w-[30%] top-4 font-bold text-3xl pr-8 ">{title}</div>
          <div className="flex flex-1  text-base font-light">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </section>
  )
}
