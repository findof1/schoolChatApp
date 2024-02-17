'use client'
import { useState } from "react"
import TextInput from "./TextInput"
import Button from "./Button"

const CustomRoomJoin = () => {
  const [room, setRoom] = useState('')
  return (
    <div className="flex flex-row items-center mt-10 ">
      <TextInput label='Custom Room Name: ' extraStyles="fade-in-4" value={room} onChange={(e)=>{setRoom(e.target.value)}}></TextInput>
      <Button route={`/chat/${room}`} extraStyles='fade-in-5 ml-2'>Join Room</Button>
    </div>
  )
}

export default CustomRoomJoin