import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { Entry } from "../../types"
import { motion, useScroll } from "framer-motion"
import { AnimatedDate } from "./AnimatedDate/AnimatedDate"
import { getEntryStartEndTime } from "../utils"
import { debounce, EDIT_MODE_TRANSITION, getStringifiedEntry } from "./utils"
import { trpc } from "../../../utils/trpc"
import { ToolBar } from "./ToolBar"
import { useDispatch } from "react-redux"
import { appActions } from "../../../redux/slices/appSlice"
import { useAppSelector } from "../../../redux/hooks"
import { FadeAnimatePresence } from "../../shared"

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

  const utils = trpc.useContext()
  const dispatch = useDispatch()
  const { isLoading, mutate: deleteMutation } = trpc.deleteEntry.useMutation({
    onSettled: () => {
      utils.allEntries.invalidate()
    },
  })

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
      editor?.commands.focus("end")
    }
  }, [isEditing, editor])

  const onDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    if (isConfirmingDelete) {
      deleteMutation({ id })
      setIsConfirmingDelete(false)
    } else {
      setIsConfirmingDelete(true)
    }
  }

  const onEditToggle = () => {
    if (isEditing) {
      mutate({ id, title: title || "", content: editor?.getJSON() })
    }
    dispatch(appActions.setEditingEntryId(isEditing ? null : id))
  }

  return (
    <section
      onClick={() => setIsConfirmingDelete(false)}
      className={`flex h-screen w-full items-center snap-center justify-between pl-24 pr-8`}
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
          width: isEditing ? "100%" : "70%",
          paddingTop: isEditing ? "2rem" : "6rem",
        }}
        className="pt-24 pb-8 h-full py-8 "
      >
        <div className="flex border-b-4 h-full border-black pl-8 py-8">
          <div className="flex flex-col mr-8 w-64 ">
            {!requiresPin && (
              <div
                onBlur={(e) => onTitleChange(e.target.innerHTML)}
                contentEditable={isEditing}
                className={`font-bold text-3xl outline-none ${
                  isBlurred ? "blur-md font-normal" : ""
                }`}
              >
                {title}
              </div>
            )}
            <div className="flex items-center font-thin pt-2 text-sm">
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
            <div className="flex ">
              <div
                onClick={onEditToggle}
                className="flex items-center cursor-pointer mt-2 mr-4"
              >
                {isEditing ? "Done" : "Edit"}
                <i className="ri-arrow-right-s-line"></i>
              </div>
              <div
                onClick={onDelete}
                className={`flex items-center cursor-pointer mt-2 ${
                  isConfirmingDelete ? "text-red" : ""
                }`}
              >
                {isLoading ? (
                  <i className="ri-loader-line animate-spin-slow"></i>
                ) : isConfirmingDelete ? (
                  "Click to confirm"
                ) : (
                  "Delete"
                )}
                <i className="ri-arrow-right-s-line"></i>
              </div>
            </div>
          </div>

          <div className="flex flex-col text-base font-thin flex-1 w-full">
            <ToolBar
              entryId={id}
              entryFinishedAt={finishedAt}
              editor={editor}
            />
            {!requiresPin && (
              <div
                className={`w-full h-full overflow-scroll relative ${
                  isBlurred ? "blur-sm" : ""
                }`}
              >
                <div className="w-full h-full [&_div:first-child]:h-full [&_div:first-child]:w-full">
                  <EditorContent editor={editor} />
                </div>
                <FadeAnimatePresence isVisible={!requiresPin} delay={0.2}>
                  <div className="absolute bottom-0 w-full h-10 bg-gradient-to-t from-white pointer-events-none" />
                </FadeAnimatePresence>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
