"use client";
import React from "react";
import Button from "./Button";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";
import { db } from "../firebase-config";
import { useRouter, useSearchParams } from "next/navigation";

const LeaveChat = ({chatId}) => {
  const search = useSearchParams()
  const { user } = useUser();
  const router = useRouter();




  const handleLeave = async () => {

          updateDoc(doc(db, "chats", chatId), {
            users: arrayRemove(user.emailAddresses[0].emailAddress)
          });
          router.push(`/directChat`);

  };

  return (
      <Button style="deny" extraStyles="fade-in-4 mt-12" onClick={handleLeave}>
        Leave Chat
      </Button>
  );
};

export default LeaveChat;
