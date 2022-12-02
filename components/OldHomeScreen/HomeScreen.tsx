import React from "react"

import { trpc } from "../../utils/trpc"
import { SetUpPin } from "./SetUpPin"
import { Dashboard } from "./Dashboard"

type HomeScreenProps = {}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  const { data, isLoading } = trpc.user.useQuery()

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 h-full w-full z-10 flex flex-1 justify-center items-center bg-black text-white">
        <i className="ri-loader-line animate-spin-slow text-2xl"></i>
      </div>
    )
  }
  return data?.user.hasPin ? <Dashboard /> : <SetUpPin />
}
