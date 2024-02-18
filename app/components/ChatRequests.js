"use client";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import React, { useEffect, useState, useCallback } from "react";
import { db } from "../firebase-config";
import { useUser } from "@clerk/clerk-react";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import Button from "./Button";
import { useRouter } from "next/navigation";

const ChatRequests = () => {
  const { user } = useUser();
  const [chatReqs, setChatReqs] = useState([]);

  const fetchData = useCallback(async () => {
    if (user) {
      setChatReqs([]);
      const q = query(
        collection(db, "requests"),
        where("user", "==", user.emailAddresses[0].emailAddress)
      );
      const reqSnapshot = await getDocs(q);
      const newChatReqs = reqSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setChatReqs(newChatReqs);
    }
  }, [user]);

  const accept = async (req) => {
    try {
      await deleteDoc(doc(db, "requests", req.id));

      await addDoc(collection(db, "chats"), {
        name: req.name,
        users: [req.senderEmail, req.user],
      });

      setChatReqs((prev) => prev.filter((r) => r.id !== req.id));
    } catch (error) {
      console.error("Error accepting chat request: ", error);
    }
  };

  const deny = async (req) => {
    try {
      await deleteDoc(doc(db, "requests", req.id));
      setChatReqs((prev) => prev.filter((r) => r.id !== req.id));
    } catch (error) {
      console.error("Error denying chat request: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="w-[45%] ml-[5%] h-full flex flex-col items-center">
      <h1 className="text-sm sm:text-lg md:text-2xl lg:text-4xl underline fade-in-2">Chat Requests</h1>
      <div className="mt-5 w-full h-full bg-gray-950 border-4 border-gray-800 overflow-auto flex flex-col items-center p-3 fade-in-3">
        {chatReqs.map((req, index) => (
          <div
            key={index}
            className="mb-4 w-full p-4 rounded-3xl text-md border-4 border-white flex flex-row fade-in-1"
          >
            { req.created ? <p>
              {req.senderName} sent you a request to join a chat room called {req.name} with {req.usernames.map((name, index)=>(<p key={index}>{name}</p>))}
            </p> : <p>
              {req.senderName} sent you a request to create a chat room called {req.name}
            </p>}
            <Button
              onClick={() => {
                accept(req);
              }}
              style="submit"
              extraStyles="min-h-7 h-7 rounded-sm ml-auto mr-3 min-w-7 w-7 relative"
            >
              <FaCheck className="w-4 h-4 ml-0 mt-0 p-0 absolute top-1 left-1" />
            </Button>
            <Button
              onClick={() => {
                deny(req);
              }}
              style="deny"
              extraStyles="min-h-7 h-7 rounded-sm mr-3 min-w-7 w-7 relative"
            >
              <FaXmark className="w-4 h-4 ml-0 mt-0 p-0 absolute top-1 left-1" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatRequests;
