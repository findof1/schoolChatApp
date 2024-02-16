'use client'
import React, { useState } from 'react'
import Button from './Button'

const Dropdown = ({extraStyles = '', children, position = 'right-0 mt-5 w-32 origin-top-right'}) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={`relative inline-block text-left ${extraStyles}`}>
  
    <Button style='circle' extraStyles="" aria-expanded="true" aria-haspopup="true" onClick={()=>{
      if(open){
        setOpen(false)
      }else{
        setOpen(true)
      }
    }}>
      
    </Button>



  {open ? <div className={`absolute ${position} rounded-md bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border-4 border-black p-2 text-white`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button">

      {children}
   
  </div> : <></>}
</div>
  )
}

export default Dropdown