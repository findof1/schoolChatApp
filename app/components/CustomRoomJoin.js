'use client'
import { useState } from "react"
import TextInput from "./TextInput"
import Button from "./Button"

const CustomRoomJoin = () => {
  const [room, setRoom] = useState('')
  return (
    <>
      <TextInput label='Room Name: ' extraStyles="mt-10 fade-in-4" value={room} onChange={(e)=>{setRoom(e.target.value)}}></TextInput>
      <Button route={`/chat/${room}`} extraStyles='fade-in-5 mt-4'>Join Room</Button>
    </>
  )
}

export default CustomRoomJoin