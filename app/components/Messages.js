"use client";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { ref, onValue, push, remove, update } from "firebase/database";
import { rl } from "../firebase-config";
import Button from "./Button";
import Link from "next/link";
import { FaReply } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Messages = ({ chat }) => {
  const { user } = useUser();
  const [msgs, setMsgs] = useState([]);
  const [reply, setReply] = useState(null);
  const [edit, setEdit] = useState(null);
  const [editMsg, setEditMsg] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const messagesRef = ref(rl, `messages/${chat}`);
    onValue(
      messagesRef,
      (snapshot) => {
        const messages = snapshot.val();
        if (messages) {
          const messagesArray = Object.keys(messages).map((key) => {
            return { msgId: key, ...messages[key] };
          });
          messagesArray.reverse();
          setMsgs(messagesArray);
        }
      },
      {
        onlyOnce: false,
      }
    );
  }, [setMsgs]);

  const deleteMessage = (msgId) => {
    const messageRef = ref(rl, `messages/${chat}/${msgId}`);
    remove(messageRef);
  };

  const confirmEdit = () => {
    const messageRef = ref(rl, `messages/${chat}/${edit.msgId}`);
    update(messageRef, { text: editMsg });

    setEdit(null);
    setEditMsg("");
  };

  function sendMessage() {
    if (msg) {
      push(ref(rl, `messages/${chat}`), {
        name: user.fullName,
        id: user.id,
        email: user.emailAddresses[0].emailAddress,
        text: msg,
        replying: reply,
      });
    }
    setMsg("");
    setReply(null);
  }

  return (
    <>
      <div className="overflow-auto w-[80%] h-[55%] mt-[1%] bg-gray-950 border-8 border-gray-800 text-xl p-4 fade-in-5">
        {msgs.map((message, index) => (
          <div
            key={index}
            className="mb-4 ml-2 w-[97%] h-[15%] flex flex-row items-center pl-2 border-4 border-gray-700 rounded-full relative"
          >
            {message.replying ? (
              <div className="text-xs absolute top-1 right-[20%]">
                Replying To: {message.replying}
              </div>
            ) : (
              <></>
            )}
            <Link href={`/user?email=${message.email}&name=${message.name}`}>
              {message.name === user?.fullName ? "You" : message.name}:{" "}
            </Link>
            <p className="ml-2">{message.text}</p>
            {user?.id == message.id ? (
              <Button
                style="xs"
                extraStyles="ml-auto mr-3"
                onClick={() => {
                  setReply(null);
                  setEdit(message);
                }}
              >
                <FaEdit className="h-4 w-3" />
              </Button>
            ) : (
              <></>
            )}
            <Button
              style="xs"
              extraStyles={`${user?.id == message.id ? "" : "ml-auto"} mr-3`}
              onClick={() => {
                setEdit(null);
                setReply(message.name + ": " + message.text);
              }}
            >
              <FaReply className="h-4 w-3" />
            </Button>
            {user?.id == message.id ||
            user?.emailAddresses == "engleluc@rockfordschools.org" ||
            user?.emailAddresses == "lucasengle071409@gmail.com" ? (
              <Button
                style="xs"
                extraStyles="mr-3"
                onClick={() => {
                  deleteMessage(message.msgId);
                }}
              >
                <MdDelete className="h-4 w-3" />
              </Button>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
      {edit ? (
        <div className="overflow-auto w-[80%] h-[10%] flex flex-row items-center bg-gray-950 border-l-8 border-r-8 border-b-8 border-gray-800 text-xl">
          <p className="ml-4">
            Changing: {edit.name}: {edit.text}, to:
          </p>
          <div className="w-[55%] flex flex-row items-center">
            <input
              value={editMsg}
              onChange={(e) => {
                setEditMsg(e.target.value);
              }}
              className="border-4 border-black bg-gray-800 min-w-[100%] text-white rounded-3xl min-h-5 p-2 pl-3 text-2xl"
            ></input>
          </div>
          <Button
            style="none"
            extraStyles="text-md mr-5 ml-5"
            onClick={() => {
              confirmEdit();
            }}
          >
            Confirm
          </Button>
          <Button
            style="none"
            extraStyles="text-md mr-5"
            onClick={() => {
              setEdit(null);
              setEditMsg("");
            }}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <></>
      )}
      {reply ? (
        <div className="overflow-auto w-[80%] h-[5%] flex flex-row items-center bg-gray-950 border-l-8 border-r-8 border-b-8 border-gray-800 text-xl">
          <p className="ml-4">Replying to: {reply}</p>{" "}
          <Button
            style="none"
            extraStyles="text-xs ml-auto mr-5"
            onClick={() => {
              setReply(null);
            }}
          >
            Stop Replying
          </Button>
        </div>
      ) : (
        <></>
      )}
      <div className="overflow-auto w-[80%] h-[10%] flex flex-row items-center bg-gray-950 border-l-8 border-r-8 border-b-8 border-gray-800 text-xl fade-in-5">
        <div className="w-[85%] ml-[2%] flex flex-row items-center">
          <label>Send A Message: </label>
          <input
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            className="border-4 border-black bg-gray-800 min-w-[80%] text-white rounded-3xl min-h-5 p-2 pl-3 text-2xl ml-2"
          ></input>
        </div>
        <Button
          onClick={() => {
            sendMessage();
            setMsg("");
          }}
        >
          Send
        </Button>
      </div>
    </>
  );
};

export default Messages;
