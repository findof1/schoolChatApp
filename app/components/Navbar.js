'use client';
import React from 'react'

const Navbar = ({homeRedirect, children}) => {
  return (
    <nav className='w-full h-[10%] border-b-8 border-black bg-gray-700 flex flex-row items-center text-white pl-6 nav-fade-in'>
      <a href={homeRedirect} onClick={()=>{sessionStorage.clear();}} className='text-2xl'>Home</a>
      <div className='w-1 h-[100%] bg-gray-800 ml-7'></div>
      <a href='/chat' onClick={()=>{sessionStorage.clear();}} className='text-2xl ml-7'>Chatrooms</a>
      <div className='w-1 h-[100%] bg-gray-800 ml-7'></div>
      <a href='/directChat' onClick={()=>{sessionStorage.clear();}} className='text-2xl ml-7'>Direct Chats</a>
      <div className='w-1 h-[100%] bg-gray-800 ml-7'></div>
      <div className='flex flex-row items-center ml-auto mr-5'>
        {children}
      </div>
    </nav>
  )
}

export default Navbar