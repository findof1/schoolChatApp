'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { db } from '../firebase-config';
import { collection, documentId, getDocs, query, where } from 'firebase/firestore';

const Users = ({id}) => {
  const [users, setUsers] = useState([])

  const fetchData = useCallback(async()=>{
    const q = query(
      collection(db, "chats"),
      where(documentId(), "==", id)
    );
    const reqSnapshot = await getDocs(q);
    const chat = reqSnapshot.docs[0]
    const data = chat.data()
    setUsers(data.users)
  },[id])

  useEffect(()=>{
    fetchData()
  }, [fetchData])
  return (
    <div className='w-[20%] mt-[6%] h-[85%] bg-gray-950 border-8 border-gray-800 text-xl p-4 flex flex-col overflow-auto'>
      <h1 className='underline text-xl text-left'>Users</h1>
      {users.map((user, index)=>(
        <p className='text-md' key={index}>{user}</p>
      ))}
    </div>
  )
}

export default Users