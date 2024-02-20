"use client";
import React, { useEffect, useState } from "react";
import TextInput from "./TextInput";
import Button from "./Button";
import { doc, updateDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";
import { db } from "../firebase-config";
import { useRouter, useSearchParams } from "next/navigation";

const ChangeName = ({chatId}) => {
  const search = useSearchParams()
  const name = search.get('name')
  const router = useRouter();
  const [changeName, setChangeName] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [created, setCreated] = useState(false);

  useEffect(()=>{
    setChangeName(sessionStorage.getItem('changeNameState'));
  }, [])

  const handleChange = async () => {
    if (!created) {
      if (changeName !== "" && changeName) {
        if (name != changeName) {
          setCreated(true);
          sessionStorage.removeItem('changeNameState')
          updateDoc(doc(db, "chats", chatId), {
            name: changeName,
          });
          router.push(`/directChat/chat/${chatId}?name=${changeName}`);
        } else {
          setErrMsg("The chat is already called this");
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
        label={`Enter a new name for ${name}: `}
        value={changeName}
        onChange={(e) => {
          if(e.target.value.length < 20){
          setChangeName(e.target.value); sessionStorage.setItem('changeNameState', e.target.value);
          }
        }}
      ></TextInput>
      <Button extraStyles="fade-in-4 mt-10" onClick={handleChange}>
        Change Name
      </Button>
      <p className="mt-2">{errMsg}</p>
      <Button extraStyles="mt-4" route={`/directChat/chat/${params.chatId}?name=${name}`}>Back</Button>
    </div>
  );
};

export default ChangeName;
