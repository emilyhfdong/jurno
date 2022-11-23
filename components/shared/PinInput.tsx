import { motion, useAnimation } from "framer-motion"
import React, { useEffect } from "react"

type PinInputProps = {
  title: string
  pin: string
  onEnter: () => Promise<{ hasError: boolean }>
  setPin: (pin: string) => void
}

export const PinInput: React.FC<PinInputProps> = ({
  title,
  pin,
  onEnter,
  setPin,
}) => {
  const pinRowControls = useAnimation()

  useEffect(() => {
    const onKeyDown = async (ev: KeyboardEvent) => {
      if (ev.key === "Backspace") {
        setPin(pin.slice(0, -1))
      }
      const isNumber = /^\d+$/.test(ev.key)
      if (isNumber) {
        setPin(`${pin}${ev.key}`)
      }

      if (ev.key === "Enter") {
        const { hasError } = await onEnter()
        if (hasError) {
          pinRowControls.start({
            x: [0, -1, 2, -4, 4, -4, 2, -1, 0],
            transition: { duration: 0.5 },
          })
        }
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [setPin, pin, pinRowControls, onEnter])

  return (
    <div className="flex flex-col p4 w-[40vw]">
      <p className={`text-4xl mb-16 text-center font-bold`}>{title}</p>
      <motion.div
        animate={pinRowControls}
        className="flex items-center justify-center gap-5  text-center font-bold"
      >
        {new Array(4).fill(0).map((_, idx) => {
          const isFilled = pin[idx]
          return (
            <motion.i
              animate={
                isFilled
                  ? { transform: ["scale(1)", "scale(1.3)", "scale(1)"] }
                  : undefined
              }
              transition={{ duration: 0.2 }}
              key={idx}
              className={`ri-asterisk text-2xl ${isFilled ? "" : "opacity-30"}`}
            />
          )
        })}
      </motion.div>
    </div>
  )
}
