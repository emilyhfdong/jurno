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
      <div ref={ref}>{/* dummy div to calculate scroll position */}</div>
      <div className="pt-32 pb-8 w-[70%] h-full py-8 ">
        <div className="flex border-b-4 h-full border-black p-6">
          <div className="w-[35%] top-4 font-bold text-3xl mr-12 ">{title}</div>
          <div className="flex flex-col justify-between w-full  ">
            <div className="flex flex-1 w-full  text-base font-light overflow-scroll relative">
              <EditorContent editor={editor} />
              <div className="absolute bottom-0 w-full h-6 bg-gradient-to-t from-white to-transparent" />
            </div>
            <div className="font-bold flex items-center cursor-pointer mt-4">
              Edit<i className="ri-arrow-right-s-line"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
