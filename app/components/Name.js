'use client'
import { useSearchParams } from "next/navigation";
import Button from "@/app/components/Button";

const Name = ({chatId}) => {
  const search = useSearchParams()
  const name = search.get('name')
  return (
    <>
    <h1 className="text-4xl mt-8 fade-in-1 underline self-center">Chatroom: {name}</h1>
    <Button extraStyles="fade-in-1 absolute right-[10%] top-[12%]" route={`/directChat/chat/${chatId}/add?name=${name}`}>Add User To Chat</Button>
    </>
  )
}

export default Name