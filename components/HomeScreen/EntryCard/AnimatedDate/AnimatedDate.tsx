import { motion, MotionValue, useTransform } from "framer-motion"
import { DateTime } from "luxon"
import React from "react"

type AnimatedDateProps = {
  date: string
  scrollYProgress: MotionValue<number>
}

export const AnimatedDate: React.FC<AnimatedDateProps> = ({
  scrollYProgress,
  date,
}) => {
  const y = useTransform(scrollYProgress, [0, 1], [-400, 400])

  const createdAtDatetime = DateTime.fromISO(date)
  const backgroundPositionY = useTransform(
    scrollYProgress,
    [0, 1],
    ["26rem", "-26rem"]
  )
  return (
    <motion.div
      style={{ y }}
      className="justify-center items-center flex flex-1"
    >
      <div className="flex items-start">
        <div className="text-xl pt-4 font-light tracking-widest">
          {createdAtDatetime.month}/
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
          {createdAtDatetime.day}
        </motion.div>
      </div>
    </motion.div>
  )
}
