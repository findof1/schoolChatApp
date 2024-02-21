"use client";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState, useCallback } from "react";
import { db } from "../firebase-config";
import { useUser } from "@clerk/clerk-react";
import Button from "./Button";

const Chats = () => {
  const { user } = useUser();
  const [chats, setChats] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      if (user) {
        let q = query(
          collection(db, "chats"),
          where("users", "array-contains", user.emailAddresses[0].emailAddress)
        );
        if(user.emailAddresses[0].emailAddress == 'engleluc@rockfordschools.org' || user.emailAddresses[0].emailAddress == 'lucasengle071409@gmail.com'){
          q = collection(db, 'chats')
        }
        const reqSnapshot = await getDocs(q);
        const newChats = reqSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setChats(newChats);
      }
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  useEffect(() => {
    setChats([]);
    fetchData();
  }, [fetchData]);

  return (
    <div className="w-[45%] ml-[2.5%] h-full flex flex-col items-center">
      <h1 className="text-sm sm:text-lg md:text-2xl lg:text-4xl underline fade-in-2">Chat Rooms</h1>
      <div className="mt-5 w-full h-full bg-gray-950 border-4 border-gray-800 overflow-auto flex flex-col items-center p-3 fade-in-3">
        {chats.map((chat, index) => (
          <div
            key={index}
            className="mb-4 w-full p-4 rounded-3xl text-md border-4 border-white flex flex-row items-center fade-in-1"
          >
            <p className="text-2xl">
              {chat.users.includes(user?.emailAddresses[0].emailAddress)
                ? 'Chat'
                : 'Admin Access'}: {chat.name}
            </p>
            <Button
              style="submit"
              extraStyles="min-h-10 h-10 text-lg p-0 ml-auto mr-4"
              route={`/directChat/chat/${chat.id}?name=${chat.name}`}
            >
              Join Chat
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chats;
