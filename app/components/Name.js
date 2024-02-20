'use client'
import { useSearchParams } from "next/navigation";
import Button from "@/app/components/Button";

const Name = ({chatId}) => {
  const search = useSearchParams()
  const name = search.get('name')

  return (
    <>
    <h1 className="text-4xl mt-8 fade-in-1 underline self-center">Chatroom: {name ? name.substring(0,  20) : chatId.substring(0,  20)}</h1>
    {name? <Button extraStyles={`fade-in-1 absolute
     h-10 text-xs w-42 right-[0%] top-[10%]
      sm:h-10 sm:text-md sm:w-42 sm:right-[7%] sm:top-[10%]
      md:h-12 md:text-lg md:w-54 md:right-[8%] md:top-[10%]
      lg:h-14 lg:text-xl lg:w-56 lg:right-[10%] lg:top-[10%]`}
     route={`/directChat/chat/${chatId}/add?name=${name}`}>Add User To Chat</Button> : <></>}
    </>
  )
}

export default Name