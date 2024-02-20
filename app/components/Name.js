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
      sm:h-10 sm:text-md sm:w-42 sm:right-[7%] sm:top-[11%]
      md:h-12 md:text-lg md:w-54 md:right-[8%] md:top-[11%]
      lg:h-14 lg:text-xl lg:w-56 lg:right-[10%] lg:top-[11%]`}
     route={`/directChat/chat/${chatId}/add?name=${name}`}>Add User To Chat</Button> : <></>}
        {name? <Button extraStyles={`fade-in-1 absolute
     h-10 text-xs w-42 left-[0%] top-[10%]
      sm:h-10 sm:text-md sm:w-42 sm:left-[1%] sm:top-[11%]
      md:h-12 md:text-lg md:w-54 md:left-[2%] md:top-[11%]
      lg:h-14 lg:text-xl lg:w-56 lg:left-[3%] lg:top-[11%]`}
     route={`/directChat/chat/${chatId}/settings?name=${name}`}>Chat Settings</Button> : <></>}
    </>
  )
}

export default Name