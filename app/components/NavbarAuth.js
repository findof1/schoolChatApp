import React from 'react'
import Navbar from './Navbar'
import { UserButton } from "@clerk/nextjs";
import Button from './Button';
import { IoIosNotifications } from "react-icons/io";
import RedDot from './RedDot';


const NavbarAuth = ({userdata}) => {
  return (
    <Navbar homeRedirect={!userdata ? '/' : '/home'}>
      <Button style='square' extraStyles='mr-5 flex items-center relative' route='/notifications'>
        <IoIosNotifications className='w-10 h-10 justify-center self-center' />
        <RedDot/>
      </Button>
      <UserButton afterSignOutUrl="/"/>
  </Navbar>
  )
}

export default NavbarAuth