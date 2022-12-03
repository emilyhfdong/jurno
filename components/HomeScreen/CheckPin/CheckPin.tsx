import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../../../redux/hooks"
import { appActions } from "../../../redux/slices/appSlice"
import { trpc } from "../../../utils/trpc"
import { FadeAnimatePresence, PinInput } from "../../shared"

type CheckPinProps = {}

export const CheckPin: React.FC<CheckPinProps> = () => {
  const requiresPin = useAppSelector((state) => state.app.requiresPin)
  const [pin, setPin] = useState("")
  const dispatch = useDispatch()
  const { mutate, data } = trpc.checkPin.useMutation({
    onSuccess: (data) => {
      setPin("")
      data.correct && dispatch(appActions.setRequiresPin(false))
    },
  })

  return (
    <FadeAnimatePresence isVisible={requiresPin}>
      <div className="fixed top-0 w-full h-full text-white text-sans flex flex-col items-center justify-center">
        <div className="pb-12 text-3xl font-bold">Enter your pin</div>
        <PinInput
          onEnter={() => mutate({ pin })}
          pin={pin}
          setPin={setPin}
          hasError={!!(data && !data.correct)}
        />
      </div>
    </FadeAnimatePresence>
  )
}
