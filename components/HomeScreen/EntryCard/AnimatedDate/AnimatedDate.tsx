import {
  AnimatePresence,
  motion,
  MotionValue,
  useTransform,
} from "framer-motion"
import { DateTime } from "luxon"
import React, { useEffect, useState } from "react"
import { BREAKPOINTS, useScreenWidth } from "../../../shared"
import { EDIT_MODE_TRANSITION } from "../utils"

type AnimatedDateProps = {
  date: string
  scrollYProgress: MotionValue<number>
  isVisible: boolean
}

const getFontSize = (screenWidth: number | undefined) => {
  if (!screenWidth) {
    return 13
  }
  if (screenWidth < BREAKPOINTS.md) {
    return 5
  }
  if (screenWidth < BREAKPOINTS.lg) {
    return 10
  }
  return 13
}

export const AnimatedDate: React.FC<AnimatedDateProps> = ({
  scrollYProgress,
  date,
  isVisible,
}) => {
  const [hasCorrectedPosition, setHasCorrectedPosition] = useState(false)
  const screenWidth = useScreenWidth()

  const isMobile = screenWidth && screenWidth <= BREAKPOINTS.md
  const fontSizeRem = getFontSize(screenWidth)

  const y = useTransform(scrollYProgress, [0, 1], [-300, 300])

  const createdAtDatetime = DateTime.fromISO(date)

  const backgroundPositionY = useTransform(
    scrollYProgress,
    isMobile ? [-0.5, 1] : [0, 1],
    [`${fontSizeRem * 2}rem`, `-${fontSizeRem * 2}rem`]
  )

  useEffect(() => {
    if (!hasCorrectedPosition && screenWidth) {
      window.scrollBy(0, 0.1)
      window.scrollTo(0, 0)
      setHasCorrectedPosition(true)
    }
  }, [screenWidth, hasCorrectedPosition])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          layout="position"
          transition={EDIT_MODE_TRANSITION}
          animate={{
            ...(isMobile
              ? { height: isVisible ? "auto" : "0rem" }
              : { width: isVisible ? `${fontSizeRem * 1.8}rem` : "0rem" }),
            opacity: 1,
          }}
          initial={{ opacity: 0, width: `${fontSizeRem * 1.8}rem` }}
          exit={{
            width: "0%",
            overflowX: "hidden",
            height: isMobile ? 0 : "auto",
          }}
          style={{ y: isMobile ? undefined : y, opacity: 1 }}
          className="md:justify-center items-center w-full flex"
        >
          <div className="flex items-start">
            <div className="text-xl pt-4 tracking-widest">
              {createdAtDatetime.toFormat("MM")}/
            </div>
            <motion.div
              style={{
                WebkitTextFillColor: "transparent",
                backgroundImage: "linear-gradient(black, black)",
                backgroundSize: `100% ${fontSizeRem}rem`,
                WebkitBackgroundClip: "text",
                backgroundPositionY,
                backgroundRepeat: "no-repeat",
                WebkitTextStroke: "1px black",
                fontSize: `${fontSizeRem}rem`,
              }}
              className="leading-none font-bold"
            >
              {createdAtDatetime.toFormat("dd")}
            </motion.div>
          </div>{" "}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
