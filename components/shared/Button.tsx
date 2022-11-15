import React from "react"
import { Button as RButton, SxStyleProp } from "rebass"
import { useThemeContext } from "../../theme"

type ButtonProps = {
  onClick?: () => void
  text: string
  sx?: SxStyleProp
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  sx,
  disabled = false,
}) => {
  const theme = useThemeContext()
  return (
    <RButton
      disabled={disabled}
      onClick={onClick}
      sx={{
        cursor: "pointer",
        backgroundColor: theme.colors.content,
        color: theme.colors.background,
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: "1.5px",
        borderRadius: 0,
        ":hover": {
          opacity: 0.8,
        },
        ":disabled": {
          opacity: 0.8,
        },
        ...sx,
      }}
    >
      {text}
    </RButton>
  )
}
