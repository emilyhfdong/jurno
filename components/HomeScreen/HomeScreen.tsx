import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import React, { useRef } from "react"
import { trpc } from "../../utils/trpc"
import { Entry } from "../types"
import { motion, useScroll, useTransform } from "framer-motion"
import { DateTime } from "luxon"

type HomeScreenProps = {}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  const { data } = trpc.allEntries.useQuery()

  return (
    <div>
      <div className="fixed border border-black top-8 left-8 w-24 bottom-8 bg-white"></div>
      <div className="fixed border border-black top-8 left-8 right-8 h-24 bg-white"></div>
      {data?.entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  )
}

type EntryCardProps = {
  entry: Entry
}

export const EntryCard: React.FC<EntryCardProps> = ({ entry }) => {
  const { content, createdAt, id, title, finishedAt } = entry
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false,
  })
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useTransform(scrollYProgress, [0, 1], [-400, 400])

  const createdAtDatetime = DateTime.fromISO(createdAt)

  const backgroundPositionY = useTransform(
    scrollYProgress,
    [0, 1],
    ["26rem", "-26rem"]
  )

  return (
    <section className="flex h-screen items-center snap-center justify-between pl-32 pr-8">
      <motion.div
        style={{ y }}
        className="justify-center items-center flex flex-1"
      >
        <div className="flex items-start">
          <div className="text-xl pt-4 font-light tracking-widest">
            {createdAtDatetime.month}/
          </div>
          <motion.div
            style={{
              WebkitTextFillColor: "transparent",
              backgroundImage: "linear-gradient(black, black)",
              backgroundSize: "100% 13rem",
              WebkitBackgroundClip: "text",
              backgroundPositionY,
              backgroundRepeat: "no-repeat",
              WebkitTextStroke: "1px black",
            }}
            className="text-[13rem] leading-none font-bold"
          >
            {createdAtDatetime.day}
          </motion.div>
        </div>
      </motion.div>
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
