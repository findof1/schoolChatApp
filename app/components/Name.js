'use client'
import { useSearchParams } from "next/navigation";

const Name = () => {
  const name = useSearchParams()
  return (
    <h1 className="text-4xl mt-8 fade-in-1 underline">Chatroom: {name}</h1>
  )
}

export default Name