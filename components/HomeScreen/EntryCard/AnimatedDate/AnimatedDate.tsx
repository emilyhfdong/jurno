import {
  AnimatePresence,
  motion,
  MotionValue,
  useTransform,
} from "framer-motion"
import { DateTime } from "luxon"
import React from "react"
import { EDIT_MODE_TRANSITION } from "../utils"

type AnimatedDateProps = {
  date: string
  scrollYProgress: MotionValue<number>
  isVisible: boolean
}

export const AnimatedDate: React.FC<AnimatedDateProps> = ({
  scrollYProgress,
  date,
  isVisible,
}) => {
  const y = useTransform(scrollYProgress, [0, 1], [-300, 300])

  const createdAtDatetime = DateTime.fromISO(date)

  const backgroundPositionY = useTransform(
    scrollYProgress,
    [0, 1],
    ["26rem", "-26rem"]
  )

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          layout="position"
          transition={EDIT_MODE_TRANSITION}
          animate={{ width: isVisible ? "30%" : "0%", opacity: 1 }}
          initial={{ opacity: 0, width: "30%" }}
          exit={{ width: "0%", overflowX: "hidden" }}
          style={{ y, opacity: 1 }}
          className="justify-center items-center w-full flex"
        >
          <div className="flex items-start">
            <div className="text-xl pt-4 font-thin tracking-widest">
              {createdAtDatetime.toFormat("MM")}/
            </div>
            <motion.div
              style={{
                WebkitTextFillColor: "transparent",
                backgroundImage: "linear-gradient(black, black)",
                backgroundSize: "100% 13rem",
                WebkitBackgroundClip: "text",
                backgroundPositionY,
                backgroundRepeat: "no-repeat",
                WebkitTextStroke: "1px black",
              }}
              className="text-[13rem] leading-none font-bold"
            >
              {createdAtDatetime.toFormat("dd")}
            </motion.div>
          </div>{" "}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
