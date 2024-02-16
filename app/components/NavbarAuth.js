import React from 'react'
import Navbar from './Navbar'
import Dropdown from './Dropdown'
import { UserButton } from "@clerk/nextjs";

const NavbarAuth = ({userdata}) => {
  return (
    <Navbar homeRedirect={!userdata ? '/' : '/home'}>
    {userdata ? (
      <>
        <p className="text-2xl mr-5">{userdata.username}</p>
        <Dropdown extraStyles="self-align mt-2">
          <p>Settings</p>
          <p>Log Out</p>
        </Dropdown>
      </>
    ) : (
      <UserButton afterSignOutUrl="/"/>
    )}
  </Navbar>
  )
}

export default NavbarAuth