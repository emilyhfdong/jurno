const FONTS = {
  sansSerif: "'Work Sans', sans-serif",
  serif: "'DM Serif Text', serif",
}

const THEMES = {
  light: {
    background: { primary: "#FBF4E8" },
    content: { primary: "#2F2E31" },
    fonts: FONTS,
  },
  blue: {
    background: { primary: "#BBC5D8" },
    content: { primary: "#2F2E31" },
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
