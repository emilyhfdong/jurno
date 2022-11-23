import React, { useState } from "react"
import { trpc } from "../../../utils/trpc"
import { LoadingIcon, PinInput } from "../../shared"

type CheckPinProps = {
  onSuccess: () => void
}

export const CheckPin: React.FC<CheckPinProps> = ({ onSuccess }) => {
  const [pin, setPin] = useState("")

  const { mutateAsync, isLoading } = trpc.checkPin.useMutation()

  return (
    <div className="fixed z-20 top-0 left-0 bg-black w-full h-full flex flex-1 justify-center items-center text-white">
      {isLoading ? (
        <LoadingIcon />
      ) : (
        <PinInput
          title="Enter your pin"
          pin={pin}
          setPin={setPin}
          onEnter={async () => {
            const response = await mutateAsync({ pin })
            if (response.correct) {
              onSuccess()
            }
            return { hasError: !response.correct }
          }}
        />
      )}
    </div>
  )
}
