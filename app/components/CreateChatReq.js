"use client";
import React, { useState } from "react";
import TextInput from "./TextInput";
import Button from "./Button";
import { addDoc, collection } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";
import { db } from "../firebase-config";
import { useRouter } from "next/navigation";

const CreateChatReq = () => {
  const { user } = useUser();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [created, setCreated] = useState(false);

  const handleCreate = async () => {
    if (!created) {
      if (name !== "" && email !== "") {
        if (email != user.emailAddresses[0].emailAddress) {
          setCreated(true);
          addDoc(collection(db, "requests"), {
            name: name,
            user: email,
            senderName: user.fullName,
            senderEmail: user.emailAddresses[0].emailAddress,
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
          setName(e.target.value);
        }}
      ></TextInput>
      <TextInput
        extraStyles="fade-in-3 mt-8"
        label="Enter the email of the user you wish to chat with: "
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></TextInput>
      <Button extraStyles="fade-in-4 mt-14" onClick={handleCreate}>
        Send Request
      </Button>
      <p className="mt-2">{errMsg}</p>
    </div>
  );
};

export default CreateChatReq;
