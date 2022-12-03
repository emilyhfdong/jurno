import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { appActions } from "../../../redux/slices/appSlice"
import { trpc } from "../../../utils/trpc"
import { PinInputScreen } from "../../shared"

type SetPinProps = {}

export const SetPin: React.FC<SetPinProps> = () => {
  const { data: userData } = trpc.user.useQuery()
  const [hasConfirmPinError, setHasConfirmPinError] = useState(false)

  const [isConfirmingPin, setIsConfirmingPin] = useState(false)
  const [pin, setPin] = useState("")
  const isVisible = !!(userData && !userData?.user.hasPin)
  const [confirmedPin, setConfirmedPin] = useState("")
  const dispatch = useDispatch()
  const utils = trpc.useContext()

  const { mutate } = trpc.updatePin.useMutation({
    onSuccess: () => {
      dispatch(appActions.setRequiresPin(false))
      utils.user.invalidate()
    },
  })

  if (isConfirmingPin) {
    return (
      <PinInputScreen
        title="Enter pin again to confirm"
        isVisible={isVisible}
        pin={confirmedPin}
        setPin={setConfirmedPin}
        hasError={hasConfirmPinError}
        onEnter={() => {
          setHasConfirmPinError(false)
          if (confirmedPin === pin) {
            mutate({ pin })
          } else {
            setHasConfirmPinError(true)
            setConfirmedPin("")
          }
        }}
      />
    )
  }

  return (
    <PinInputScreen
      title="Set a pin"
      isVisible={isVisible}
      pin={pin}
      setPin={setPin}
      hasError={false}
      onEnter={() => setIsConfirmingPin(true)}
    />
  )
}
