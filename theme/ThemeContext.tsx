const FONTS = {
  sansSerif: "'Work Sans', sans-serif",
  serif: "'DM Serif Text', serif",
}

const THEMES = {
  light: {
    colors: {
      background: "#FBF4E8",
      content: "#0D0E17",
      secondaryContent: "#9F9C94",
    },
    fonts: FONTS,
  },
  blue: {
    colors: {
      background: "#BBC5D8",
      content: "#0D0E17",
      secondaryContent: "#9F9C94",
    },
    fonts: FONTS,
  },
}

import { createContext, ReactNode, useContext } from "react"

type ThemeContextType = typeof THEMES["light"]

const initialValue: ThemeContextType = THEMES.light

const ThemeContext = createContext<ThemeContextType>(initialValue)

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => (
  <ThemeContext.Provider value={initialValue}>{children}</ThemeContext.Provider>
)

export const useThemeContext = () => useContext(ThemeContext)
