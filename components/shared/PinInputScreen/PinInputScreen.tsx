import React from "react"
import { FadeAnimatePresence } from "../FadeAnimatePresence"
import { PinInput } from "./PinInput"

type PinInputScreenProps = {
  isVisible: boolean
  onEnter: () => void
  hasError: boolean
  setPin: (pin: string) => void
  pin: string
  title: string
  isLoading?: boolean
}

export const PinInputScreen: React.FC<PinInputScreenProps> = ({
  isVisible,
  onEnter,
  hasError,
  setPin,
  pin,
  title,
  isLoading,
}) => {
  return (
    <FadeAnimatePresence isVisible={isVisible}>
      <div className="fixed top-0 w-full h-full text-white text-sans flex flex-col items-center justify-center">
        <div className="pb-12 text-3xl font-bold">{title}</div>
        <PinInput
          onEnter={onEnter}
          pin={pin}
          setPin={setPin}
          hasError={hasError}
          isLoading={isLoading}
        />
      </div>
    </FadeAnimatePresence>
  )
}
