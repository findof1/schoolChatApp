"use client";
import React, { useEffect, useState } from "react";
import TextInput from "./TextInput";
import Button from "./Button";
import { addDoc, collection } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";
import { db } from "../firebase-config";
import { useRouter, useSearchParams } from "next/navigation";

const AddUser = ({chatId}) => {
  const search = useSearchParams()
  const name = search.get('name')
  const { user } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [created, setCreated] = useState(false);

  useEffect(()=>{
    setEmail(sessionStorage.getItem('AddUserEmail'));
  }, [])

  const handleCreate = async () => {
    if (!created) {
      if (email !== "") {
        if (email != user.emailAddresses[0].emailAddress) {
          setCreated(true);
          sessionStorage.removeItem('AddUserEmail')
          addDoc(collection(db, "requests"), {
            name: name,
            user: email,
            senderName: user.fullName,
            senderEmail: user.emailAddresses[0].emailAddress,
            created: true,
            chatId: chatId
          });
          router.push(`/directChat/chat/${chatId}`);
        } else {
          setErrMsg("You cannot send a request to yourself");
        }
      } else {
        setErrMsg("Please fill out all fields");
      }
    } else {
      setErrMsg("Loading...");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <TextInput
        extraStyles="fade-in-3 mt-8"
        label="Enter the email of the user you wish to chat with: "
        value={email}
        onChange={(e) => {
          setEmail(e.target.value); sessionStorage.setItem('AddUserEmail', e.target.value);
        }}
      ></TextInput>
      <Button extraStyles="fade-in-4 mt-14" onClick={handleCreate}>
        Send Request
      </Button>
      <p className="mt-2">{errMsg}</p>
    </div>
  );
};

export default AddUser;
