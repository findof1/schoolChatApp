"use client";
import { useEffect, useState } from "react";
import TextInput from "./TextInput";
import Button from "./Button";

const CustomRoomJoin = () => {
  const [room, setRoom] = useState("");
  const [route, setRoute] = useState("");

  useEffect(() => {
    setRoom(sessionStorage.getItem("roomState"));
  }, []);

  useEffect(() => {
    if (room) {
      setRoute(`/chat/${room}`);
    } else {
      setRoute("/chat");
    }
  }, [room]);

  return (
    <div className="flex flex-row items-center mt-10 ">
      <TextInput
        label="Custom Room Name: "
        extraStyles="fade-in-4"
        value={room}
        onChange={(e) => {
          const newValue = e.target.value;
          if (newValue.length <= 20) {
            setRoom(newValue);
            sessionStorage.setItem("roomState", newValue);
          }
        }}
      ></TextInput>
      <Button route={route} extraStyles="fade-in-5 ml-2">
        Join Room
      </Button>
    </div>
  );
};

export default CustomRoomJoin;
