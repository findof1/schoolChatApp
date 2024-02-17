import Link from 'next/link'
import React from 'react'

const Navbar = ({homeRedirect, children}) => {
  return (
    <nav className='w-screen h-[10vh] border-b-8 border-black bg-gray-700 flex flex-row items-center text-white pl-6 nav-fade-in'>
      <Link href={homeRedirect} className='text-2xl'>Home</Link>
      <div className='w-1 h-[100%] bg-gray-800 ml-7'></div>
      <Link href='/chat' className='text-2xl ml-7'>Chatrooms</Link>
      <div className='w-1 h-[100%] bg-gray-800 ml-7'></div>
      <Link href='/directChat' className='text-2xl ml-7'>Direct Chats</Link>
      <div className='w-1 h-[100%] bg-gray-800 ml-7'></div>
      <div className='flex flex-row items-center ml-auto mr-5'>
        {children}
      </div>
    </nav>
  )
}

export default Navbar