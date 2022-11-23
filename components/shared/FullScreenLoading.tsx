import React from "react"

type FullScreenLoadingProps = {}

export const FullScreenLoading: React.FC<FullScreenLoadingProps> = () => {
  return (
    <div className="flex flex-1 justify-center items-center">
      <i className="ri-loader-line animate-spin-slow text-2xl"></i>
    </div>
  )
}
