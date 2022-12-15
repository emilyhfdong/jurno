import { AnimatePresence, motion } from "framer-motion"
import React, { useMemo, useRef } from "react"
import { useAppSelector } from "../../../redux/hooks"
import { trpc } from "../../../utils/trpc"
import { EDIT_MODE_TRANSITION } from "../../HomeScreen/EntryCard/utils"

type ToolBarProps = {}

export const ToolBar: React.FC<ToolBarProps> = () => {
  const editor = useAppSelector((state) => state.app.activeEditor)
  const entryId = useAppSelector((state) => state.app.editingEntryId)
  const { data } = trpc.allEntries.useQuery()

  const entryFinishedAt = useMemo(
    () => data?.entries.find((entry) => entry.id === entryId)?.finishedAt,
    [data, entryId]
  )

  const ref = useRef<HTMLDivElement>(null)
  const isEditing = useAppSelector((state) => !!state.app.editingEntryId)
  const utils = trpc.useContext()

  const { mutate, isLoading } = trpc.finishEntry.useMutation({
    onSuccess: () => utils.allEntries.invalidate(),
  })

  if (!entryId) {
    return null
  }

  return (
    <AnimatePresence presenceAffectsLayout>
      {isEditing && (
        <motion.div
          ref={ref}
          initial="collapsed"
          animate="open"
          variants={{
            open: { height: "auto", opacity: 1 },
            collapsed: { height: 0, opacity: 0 },
          }}
          transition={EDIT_MODE_TRANSITION}
        >
          <div className="flex items-center px-4 text-lg">
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleBold().run()}
              isActive={editor?.isActive("bold")}
              iconClassName="ri-bold"
            />
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              isActive={editor?.isActive("italic")}
              iconClassName="ri-italic"
            />
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleStrike().run()}
              isActive={editor?.isActive("strike")}
              iconClassName="ri-strikethrough"
            />
            <Divider />
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              isActive={editor?.isActive("bulletList")}
              iconClassName="ri-list-unordered"
            />
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              isActive={editor?.isActive("orderedList")}
              iconClassName="ri-list-ordered"
            />
            <Divider />
            <ToolbarButton
              onClick={() => editor?.chain().focus().undo().run()}
              isActive={false}
              iconClassName="ri-arrow-go-back-line"
            />
            <ToolbarButton
              onClick={() => editor?.chain().focus().redo().run()}
              isActive={false}
              iconClassName="ri-arrow-go-forward-line"
            />
            <Divider />
            <ToolbarButton
              onClick={() => !entryFinishedAt && mutate({ id: entryId })}
              isActive={!!entryFinishedAt}
              iconClassName={
                isLoading
                  ? "ri-loader-line animate-spin-slow"
                  : "ri-check-double-line"
              }
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

type ToolbarButtonProps = {
  isActive: boolean | undefined
  iconClassName: string
  onClick: () => void
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  isActive,
  iconClassName,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-center h-6 w-6 mx-1 rounded cursor-pointer ${
        isActive ? "bg-black text-white" : "hover:bg-black hover:text-white"
      }`}
    >
      <i className={iconClassName}></i>
    </div>
  )
}

export const Divider: React.FC = () => {
  return <div className="h-4 w-[1px] bg-grey mx-3" />
}
