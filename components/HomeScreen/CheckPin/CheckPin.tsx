import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../../../redux/hooks"
import { appActions } from "../../../redux/slices/appSlice"
import { trpc } from "../../../utils/trpc"
import { PinInputScreen } from "../../shared"

type CheckPinProps = {}

export const CheckPin: React.FC<CheckPinProps> = () => {
  const { data: userData } = trpc.user.useQuery()
  const requiresPin = useAppSelector((state) => state.app.requiresPin)
  const [pin, setPin] = useState("")
  const dispatch = useDispatch()
  const { mutate, data, isLoading } = trpc.checkPin.useMutation({
    onSuccess: (data) => {
      setPin("")
      data.correct && dispatch(appActions.setRequiresPin(false))
    },
  })

  return (
    <PinInputScreen
      title="Enter your pin"
      isVisible={requiresPin && !!userData?.user.hasPin}
      onEnter={() => mutate({ pin })}
      pin={pin}
      setPin={setPin}
      hasError={!!(data && !data.correct)}
      isLoading={isLoading}
    />
  )
}
