import { Editor } from "@tiptap/react"
import React from "react"
import { trpc } from "../../../../utils/trpc"

type ToolbarProps = {
  editor: Editor | null
  entryId: string
  entryHasFinished: boolean
}

export const Toolbar: React.FC<ToolbarProps> = ({
  editor,
  entryId,
  entryHasFinished,
}) => {
  const utils = trpc.useContext()
  const { mutate, isLoading } = trpc.finishEntry.useMutation({
    onSuccess: () => utils.allEntries.invalidate(),
  })

  return (
    <div className="flex items-center justify-between p-2 border-b border-black text-lg">
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
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
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
        onClick={() => !entryHasFinished && mutate({ id: entryId })}
        isActive={entryHasFinished}
        iconClassName={
          isLoading
            ? "ri-loader-line animate-spin-slow"
            : "ri-check-double-line"
        }
      />
    </div>
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
