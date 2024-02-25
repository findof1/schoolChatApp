"use client";
import React, { useEffect, useState } from "react";
import TextInput from "./TextInput";
import Button from "./Button";
import { addDoc, collection } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";
import { db, rl } from "../firebase-config";
import { useRouter } from "next/navigation";
import { push, ref } from "firebase/database";

const CreateChatReq = () => {
  const { user } = useUser();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [created, setCreated] = useState(false);

  useEffect(()=>{
    setName(sessionStorage.getItem('reqNameState'))
    setEmail(sessionStorage.getItem('reqEmailState'))
  }, [])

  const handleCreate = async () => {
    if (!created) {
      if (name !== "" && email !== "" && name && email) {
        if (email != user.emailAddresses[0].emailAddress) {
          setCreated(true);
          addDoc(collection(db, "requests"), {
            name: name,
            user: email,
            senderName: user.fullName,
            senderEmail: user.emailAddresses[0].emailAddress,
            created: false
          });
          push(ref(rl, `notifications/${email.replace(/\./g, '_')}`), {
            from: user.fullName,
            fromEmail: user.emailAddresses[0].emailAddress,
            date: new Date().toISOString(),
            type: 'request'
          });
          router.push("/directChat");
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
        extraStyles="fade-in-2 mt-5"
        label="Enter a name for the Chat: "
        value={name}
        onChange={(e) => {
          if(e.target.value.length < 20){
          setName(e.target.value);
          sessionStorage.setItem('reqNameState', e.target.value);
          }
        }}
      ></TextInput>
      <TextInput
        extraStyles="fade-in-3 mt-8"
        label="Enter the email of the user you wish to chat with: "
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          sessionStorage.setItem('reqEmailState', e.target.value);
        }}
      ></TextInput>
      <Button extraStyles="fade-in-4 mt-14" onClick={handleCreate}>
        Send Request
      </Button>
      <p className="mt-2">{errMsg}</p>
      <p className="mt-2 fade-in-5">Note: You can add more users to a chat later.</p>
    </div>
  );
};

export default CreateChatReq;
