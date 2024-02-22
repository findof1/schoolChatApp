'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { db, rl } from '../firebase-config';
import { collection, documentId, getDocs, query, where } from 'firebase/firestore';
import { off, onDisconnect, onValue, ref, remove, set } from 'firebase/database';
import { useUser } from "@clerk/clerk-react";

const Users = ({id}) => {
  const {user} = useUser()
  const [users, setUsers] = useState([])
  const [online, setOnline] = useState([])

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

  useEffect(() => {
    if(user){
    const userRef = ref(rl, `connectedUsers/${id}/${user.id}`);
    const chatConnRef = ref(rl, `connectedUsers/${id}`)
    const handleConnectionStateChange = (connected) => {
      if (connected) {


        set(userRef, user.emailAddresses[0].emailAddress); 

        
        onDisconnect(userRef).remove();
      }
    };

    const connectedRef = ref(rl, '.info/connected');
    onValue(connectedRef, (snapshot) => {
      handleConnectionStateChange(snapshot.val());
    });

    const handleConnectedUsersChange = (snapshot) => {
      const connectedUsers = snapshot.val();
      const usersList = connectedUsers ? Object.values(connectedUsers) : [];
      setOnline(usersList);
    };

    onValue(chatConnRef, handleConnectedUsersChange);
    return () => {
      off(connectedRef, 'value', handleConnectionStateChange);
      off(chatConnRef, 'value', handleConnectedUsersChange);
    };
  }
  }, [user]);


  return (
    <div className='w-[20%] mt-[6%] h-[85%] bg-gray-950 border-8 border-gray-800 text-xl p-4 flex flex-col overflow-auto'>

      <h1 className='underline text-xl text-left'>Online Users</h1>
      {online.map((user, index)=>(
        <p className='text-md' key={index}>{user}</p>
      ))}

      <h1 className='underline text-xl text-left'>All Users</h1>
      {users.map((user, index)=>(
        <p className='text-md' key={index}>{user}</p>
      ))}


    </div>
  )
}

export default Users