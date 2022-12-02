import { Editor } from "@tiptap/react"
import { AnimatePresence, motion } from "framer-motion"
import React, { useRef } from "react"
import { useAppSelector } from "../../../../redux/hooks"
import { trpc } from "../../../../utils/trpc"

type ToolBarProps = {
  editor: Editor | null
  entryFinishedAt: string | null
  entryId: string
}

export const ToolBar: React.FC<ToolBarProps> = ({
  editor,
  entryFinishedAt,
  entryId,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isEditing = useAppSelector((state) => !!state.app.editingEntryId)
  const utils = trpc.useContext()

  const { mutate, isLoading } = trpc.finishEntry.useMutation({
    onSuccess: () => utils.allEntries.invalidate(),
  })

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
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-5 p-2 border-b border-black text-lg mt-[-1rem]">
            <div className="flex items-center">
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
              <div className="h-4 w-[1px] bg-grey mx-3" />
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                isActive={editor?.isActive("bulletList")}
                iconClassName="ri-list-unordered"
              />
              <ToolbarButton
                onClick={() =>
                  editor?.chain().focus().toggleOrderedList().run()
                }
                isActive={editor?.isActive("orderedList")}
                iconClassName="ri-list-ordered"
              />
              <div className="h-4 w-[1px] bg-grey mx-3" />
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
            </div>
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
