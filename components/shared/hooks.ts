import { useEffect, useState } from "react"

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
}

export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState<number>(0)

  useEffect(() => {
    const getAndSetScreensize = () => {
      setScreenWidth(window.innerWidth)
    }
    getAndSetScreensize()

    window.addEventListener("resize", getAndSetScreensize)
    return () => window.removeEventListener("resize", getAndSetScreensize)
  }, [])

  return screenWidth
}
