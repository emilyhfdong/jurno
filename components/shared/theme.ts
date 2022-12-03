import resolveConfig from "tailwindcss/resolveConfig"
import { useAppSelector } from "../../redux/hooks"
import _tailwindConfig from "../../tailwind.config.js"

export const tailwindConfig = resolveConfig(_tailwindConfig) as any

export const useTheme = (): {
  background: string
  content: string
  border: string
  grey: string
  black: string
  white: string
} => {
  const requiresPin = useAppSelector((state) => state.app.requiresPin)
  const { black, white, grey } = tailwindConfig.theme.colors

  return {
    background: requiresPin ? black : white,
    content: requiresPin ? white : black,
    border: requiresPin ? grey : black,
    grey,
    black,
    white,
  }
}
