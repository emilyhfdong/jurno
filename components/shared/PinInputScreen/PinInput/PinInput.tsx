import { motion, useAnimation } from "framer-motion"
import React, { useEffect } from "react"
import { useTheme } from "../../theme"

type PinInputProps = {
  pin: string
  onEnter: () => void
  setPin: (pin: string) => void
  hasError: boolean
}

export const PinInput: React.FC<PinInputProps> = ({
  pin,
  onEnter,
  setPin,
  hasError,
}) => {
  const pinRowControls = useAnimation()
  const theme = useTheme()

  useEffect(() => {
    const onKeyDown = async (ev: KeyboardEvent) => {
      if (ev.key === "Backspace") {
        setPin(pin.slice(0, -1))
      }
      const isNumber = /^\d+$/.test(ev.key)
      if (isNumber && pin.length < 4) {
        setPin(`${pin}${ev.key}`)
      }

      if (ev.key === "Enter" && pin.length === 4) {
        onEnter()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [setPin, pin, pinRowControls, onEnter])

  return (
    <motion.div
      className="flex gap-5  text-center font-bold"
      variants={{
        shake: {
          x: [0, -2, 4, -8, 8, -8, 4, -2, 0],
          transition: { duration: 0.6 },
        },
      }}
      initial="initial"
      animate={hasError ? "shake" : undefined}
    >
      {new Array(4).fill(0).map((_, idx) => {
        const isFilled = pin[idx]
        return (
          <motion.div
            key={idx}
            animate={{
              borderColor: isFilled ? theme.white : theme.grey,
            }}
            transition={{ duration: 0.1 }}
            className="flex justify-center items-center border border-grey p-4 rounded-md"
          >
            <motion.i
              animate={
                isFilled
                  ? { transform: ["scale(1)", "scale(1.4)", "scale(1)"] }
                  : undefined
              }
              transition={{ duration: 0.2 }}
              className={`ri-asterisk text-2xl block  ${
                isFilled ? "" : "opacity-30"
              }`}
            />
          </motion.div>
        )
      })}
    </motion.div>
  )
}
