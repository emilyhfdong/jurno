import React from "react"

type ButtonProps = {
  onClick?: () => void
  text: string
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="cursor-pointer bg-black color text-white text-xs font-medium tracking-widest rounded-none hover:opacity-80 disabled:opacity-80 py-2 px-3"
    >
      {text}
    </button>
  )
}
