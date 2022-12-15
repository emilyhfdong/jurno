import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { Entry } from "../../types"
import { motion, useScroll } from "framer-motion"
import { AnimatedDate } from "./AnimatedDate/AnimatedDate"
import { getEntryStartEndTime } from "../utils"
import { debounce, EDIT_MODE_TRANSITION, getStringifiedEntry } from "./utils"
import { trpc } from "../../../utils/trpc"
import { useDispatch } from "react-redux"
import { appActions } from "../../../redux/slices/appSlice"
import { useAppSelector } from "../../../redux/hooks"
import { BREAKPOINTS, FadeAnimatePresence, useScreenWidth } from "../../shared"
import { DeleteButton } from "./DeleteButton"
import { EditButton } from "./EditButton"

type EntryCardProps = {
  entry: Entry
}

export const EntryCard: React.FC<EntryCardProps> = ({ entry }) => {
  const {
    content: initialContent,
    createdAt,
    title: initialTitle,
    finishedAt,
    id,
  } = entry
  const [persistedStringifiedContent, setPersistedStringifiedContent] =
    useState(getStringifiedEntry(entry))
  const [title, setTitle] = useState(initialTitle)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)

  const isBlurred = useAppSelector((state) => state.app.isBlurred)
  const isEditing = useAppSelector((state) => state.app.editingEntryId === id)
  const requiresPin = useAppSelector((state) => state.app.requiresPin)

  const screenWidth = useScreenWidth()
  const isMobile = screenWidth && screenWidth <= BREAKPOINTS.md

  const dispatch = useDispatch()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const boundingRect = containerRef.current?.getBoundingClientRect()
      if (boundingRect && boundingRect.y === 0) {
        dispatch(appActions.setCurrentEntryDate(createdAt))
      }
    }
    onScroll()

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [createdAt, dispatch, containerRef])

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    editable: isEditing,
    onUpdate: ({ editor }) => {
      debounce(() => mutate({ content: editor.getJSON(), id }))
    },
  })

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const { mutate } = trpc.updateEntry.useMutation({
    onSuccess: ({ entry: { content, title } }) =>
      setPersistedStringifiedContent(getStringifiedEntry({ content, title })),
  })

  const isSaved =
    persistedStringifiedContent ===
    getStringifiedEntry({
      content: editor?.getJSON() ?? null,
      title,
    })

  const onTitleChange = useCallback(
    (newTitle: string) => {
      setTitle(newTitle)
      debounce(() => mutate({ title: newTitle, id }))
    },
    [setTitle, id, mutate]
  )

  useEffect(() => {
    editor?.setOptions({ editable: isEditing })
    if (isEditing) {
      editor?.commands.focus()
    }
  }, [isEditing, editor])

  return (
    <motion.section
      ref={containerRef}
      onClick={() => setIsConfirmingDelete(false)}
      className={`flex relative flex-col md:flex-row h-screen w-full md:items-center snap-start md:snap-center md:justify-between pt-16 md:pt-0 pl-16 pr-4 md:pl-52 md:pr-8 overflow-hidden pb-4 md:pb-0`}
    >
      <AnimatedDate
        isVisible={!isEditing}
        date={createdAt}
        scrollYProgress={scrollYProgress}
      />
      <div ref={ref}>{/* dummy div to calculate scroll position */}</div>
      <motion.div
        layout="position"
        transition={EDIT_MODE_TRANSITION}
        initial={false}
        animate={{
          paddingTop: isMobile ? "0rem" : isEditing ? "4.5rem" : "6rem",
        }}
        className="flex-1 h-full py-0 md:py-8 overflow-hidden"
      >
        <div
          className={`flex overflow-hidden h-full flex-col ${
            isEditing ? "md:border-b md:border-r" : "md:border-b-4"
          } border-black pl-0 md:pl-8 pt-2 md:pt-8`}
        >
          {!requiresPin && (
            <div
              onBlur={(e) => onTitleChange(e.target.innerHTML)}
              contentEditable={isEditing}
              className={`font-bold text-xl md:text-3xl outline-none ${
                isBlurred ? "blur-md font-normal" : ""
              }`}
            >
              {title}
            </div>
          )}
          <div className="flex items-center font-thin mt-1 md:mt-2 text-sm">
            {getEntryStartEndTime({
              createdAt,
              finishedAt,
            }).toLocaleLowerCase()}
            {isEditing && (
              <i
                className={`ri-check-line ${
                  isSaved ? "text-grey" : "text-transparent"
                }  ml-1`}
              ></i>
            )}
          </div>
          <div className="flex mt-1 md:mt-2 ">
            <EditButton
              editor={editor}
              entryId={id}
              saveEntry={() =>
                mutate({ id, title: title || "", content: editor?.getJSON() })
              }
            />
            <DeleteButton
              entryId={id}
              isConfirmingDelete={isConfirmingDelete}
              setIsConfirmingDelete={setIsConfirmingDelete}
            />
          </div>
          <div className="mt-4 h-full overflow-hidden">
            <div className="h-full overflow-hidden text-sm font-light flex-1 w-full relative">
              {!requiresPin && (
                <div
                  className={`w-full h-full overflow-scroll ${
                    isBlurred ? "blur-sm" : ""
                  }`}
                >
                  <div className="w-full md:h-full md:[&_div:first-child]:h-full [&_div:first-child]:w-full">
                    <EditorContent editor={editor} />
                  </div>
                  <FadeAnimatePresence isVisible={!requiresPin} delay={0.2}>
                    <div className="absolute bottom-0 w-full h-10 bg-gradient-to-t from-white pointer-events-none" />
                  </FadeAnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}
