import React, { useState } from "react"
import { trpc } from "../../../../utils/trpc"

type DeleteButtonProps = {
  entryId: string
  isConfirmingDelete: boolean
  setIsConfirmingDelete: (isConfirmingDelete: boolean) => void
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  entryId,
  isConfirmingDelete,
  setIsConfirmingDelete,
}) => {
  const utils = trpc.useContext()
  const { isLoading, mutate: deleteMutation } = trpc.deleteEntry.useMutation({
    onSettled: () => {
      utils.allEntries.invalidate()
    },
  })
  const onDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    if (isConfirmingDelete) {
      deleteMutation({ id: entryId })
      setIsConfirmingDelete(false)
    } else {
      setIsConfirmingDelete(true)
    }
  }
  return (
    <div
      onClick={onDelete}
      className={`flex items-center cursor-pointer ${
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
  )
}
