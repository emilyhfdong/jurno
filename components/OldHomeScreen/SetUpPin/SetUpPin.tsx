import React, { useState } from "react"
import { trpc } from "../../../utils/trpc"
import { LoadingIcon, PinInput } from "../../shared"
import { useDispatch } from "react-redux"
import { appActions } from "../../../redux/slices/appSlice"

type SetUpPinProps = {}

export const SetUpPin: React.FC<SetUpPinProps> = () => {
  const [pin, setPin] = useState("")
  const [confirmedPin, setConfirmedPin] = useState("")
  const [mode, setMode] = useState<"setPin" | "confirmPin">("setPin")
  const dispatch = useDispatch()

  const utils = trpc.useContext()

  const { isLoading, mutate } = trpc.updatePin.useMutation({
    onSuccess: () => {
      dispatch(appActions.setRequiresPin(false))
      utils.user.invalidate()
    },
  })

  return (
    <div className="fixed z-20 top-0 left-0 bg-black w-full h-full flex flex-1 justify-center items-center text-white">
      {isLoading ? (
        <LoadingIcon />
      ) : (
        <PinInput
          title={mode === "setPin" ? "Set up your pin" : "Confirm your pin"}
          pin={mode === "setPin" ? pin : confirmedPin}
          setPin={mode === "setPin" ? setPin : setConfirmedPin}
          onEnter={async () => {
            if (mode === "setPin" && pin.length === 4) {
              setMode("confirmPin")
              return { hasError: false }
            }
            if (mode === "confirmPin" && confirmedPin.length === 4) {
              if (confirmedPin !== pin) {
                return { hasError: true }
              }
              mutate({ pin: confirmedPin })
            }
            return { hasError: false }
          }}
        />
      )}
    </div>
  )
}