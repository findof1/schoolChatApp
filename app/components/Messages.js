"use client";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect, useCallback } from "react";
import { ref, onValue, push, remove, update } from "firebase/database";
import { db, rl } from "../firebase-config";
import Button from "./Button";
import Link from "next/link";
import { FaReply } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Name from "./Name";
import { collection, documentId, getDocs, query, where } from "firebase/firestore";

const Messages = ({ chatId = 'no id', chat, path = "messages" }) => {
  const { user } = useUser();
  const [msgs, setMsgs] = useState([]);
  const [reply, setReply] = useState(null);
  const [edit, setEdit] = useState(null);
  const [editMsg, setEditMsg] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const replyState = sessionStorage.getItem('replyState');
    const editState = sessionStorage.getItem('editState');
    const editMsgState = sessionStorage.getItem('editMsgState');
    const msgState = sessionStorage.getItem('msgState');
    if (replyState && replyState !== 'null') {
      setReply(replyState);
    }
    if (editState) {
      setEdit(JSON.parse(editState));
    }
    if (editMsgState) {
      setEditMsg(editMsgState);
    }
    if (msgState) {
      setMsg(msgState);
    }
  }, []);

  const validateUser = useCallback( async()=>{

    const q = query(collection(db, 'chats'), where(documentId(), '==', chatId), where('users', 'array-contains', user.emailAddresses[0].emailAddress))

    const doc = await getDocs(q)
    return !doc.empty
  
  }, [user, chatId])

  useEffect(() => {
    if(chatId != 'no id'){
    if(chatId && user){
    const validateAndSetMessages = async () => {
      const isValidUser = await validateUser();
      if (isValidUser) {
        const messagesRef = ref(rl, `${path}/${chat}`);
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
      }
    };

    validateAndSetMessages();
  }
}else{
  const messagesRef = ref(rl, `${path}/${chat}`);
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
}
  }, [setMsgs, chat, path, validateUser, chatId, user]);

  const deleteMessage = (msgId) => {
    setEdit(null);
    sessionStorage.setItem('editState', JSON.stringify(null))
    setEditMsg("");
    sessionStorage.setItem('editMsgState', "")
    setReply(null);
    sessionStorage.setItem('replyState', null)
    const messageRef = ref(rl, `${path}/${chat}/${msgId}`);
    remove(messageRef);
  };

  const confirmEdit = () => {
    const messageRef = ref(rl, `${path}/${chat}/${edit.msgId}`);
    update(messageRef, { text: editMsg, edited: true });

    setEdit(null);
    sessionStorage.setItem('editState', JSON.stringify(null))
    setEditMsg("");
    sessionStorage.setItem('editMsgState', "")
  };

  function sendMessage() {
    if (msg && msg.length < 80) {
      push(ref(rl, `${path}/${chat}`), {
        name: user.fullName,
        id: user.id,
        email: user.emailAddresses[0].emailAddress,
        text: msg,
        replying: reply,
      });
    }
    setMsg("");
    
    sessionStorage.setItem('msgState', JSON.stringify(null));
    setReply(null);
    sessionStorage.setItem('replyState', JSON.stringify(null));
  }

  return (
    <div className="flex flex-col w-[90%] h-full ml-[2.5%]">
      <Name chatId={chatId}/>
      <div className="overflow-auto w-[95%] h-[80%] mt-[1%] bg-gray-950 border-8 border-gray-800 text-xl p-4">
        {msgs.map((message, index) => (
          <div
            key={index}
            className="mb-4 ml-2 w-[97%] h-[15%] flex flex-row items-center pl-2 border-4 border-gray-700 rounded-full relative"
          >
            {message.replying ? (
              <div className="text-xs absolute top-1 right-[20%]">
                Replying To: {message?.replying.includes(user?.fullName) ? `You: ${message.replying.split(':')[1]}`: message.replying}
              </div>
            ) : (
              <></>
            )}
            <Link href={`/user?email=${message.email}&name=${message.name}`}>
              {message.name === user?.fullName ? "You" : message.name}:{" "}
            </Link>
            <p className="ml-2">{message.text}</p>
            <p className="ml-2 text-xs mt-auto mb-2">{message.edited ? '\u0022edited\u0022' : ''}</p>
            {user?.id == message.id ? (
              <Button
                style="xs"
                extraStyles="ml-auto mr-3"
                onClick={() => {
                  setReply(null);
                  sessionStorage.setItem('replyState', JSON.stringify(null));
                  setEdit(message);
                  sessionStorage.setItem('editState', JSON.stringify(message));
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
                sessionStorage.setItem('editState', JSON.stringify(null));
                setReply(message.name + ": " + message.text);
                sessionStorage.setItem('replyState', message.name + ": " + message.text);
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
        <div className="overflow-auto w-[95%] h-[15%] flex flex-row items-center bg-gray-950 border-l-8 border-r-8 border-b-8 border-gray-800 text-xl">
          <p className="ml-4">
            Changing: {edit.name == user?.fullName ? 'You: ' : `${edit.name}: `}{edit.text}, to:
          </p>
          <div className="w-[55%] flex flex-row items-center">
            <input
              value={editMsg}
              onKeyDown={
                (e)=>{
                  if(e.key == 'Enter'){
                    confirmEdit()
                  }
                  if(e.key == "Escape"){
                    setEdit(null);
                    sessionStorage.setItem('editState', JSON.stringify(null));
                    setEditMsg("");
                    sessionStorage.setItem('editMsgState', "");
                  }
                }
              }
              onChange={(e) => {
                const newMsg = e.target.value
                if(newMsg.length < 70){
                setEditMsg(e.target.value);
                sessionStorage.setItem('editMsgState', e.target.value);
                }
              }}
              className="border-4 border-black bg-gray-800 min-w-[100%] text-white rounded-3xl min-h-5 h-10 p-2 pl-3 text-2xl"
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
              sessionStorage.setItem('editState', JSON.stringify(null));
              setEditMsg("");
              sessionStorage.setItem('editMsgState', "");
            }}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <></>
      )}
      {reply ? (
        <div className="overflow-auto w-[95%] h-[13%] flex flex-row items-center bg-gray-950 border-l-8 border-r-8 border-b-8 border-gray-800 text-xl">
          <p className="ml-4">Replying to: {reply.includes(user?.fullName) ? `You: ${reply.split(':')[1]}`: reply}</p>{" "}
          <Button
            style="none"
            extraStyles="text-xs ml-auto mr-5"
            onClick={() => {
              setReply(null);
              sessionStorage.setItem('replyState', JSON.stringify(null));
            }}
          >
            Stop Replying
          </Button>
        </div>
      ) : (
        <></>
      )}
      <div className="overflow-auto w-[95%] h-[15%] flex flex-row items-center bg-gray-950 border-l-8 border-r-8 border-b-8 border-gray-800 text-xl ">
        <div className="w-[85%] ml-[2%] flex flex-row items-center">
          <label>Send A Message: </label>
          <input
            value={msg}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
                setMsg("");
                sessionStorage.setItem('msgState', "");
              }
            }}
            onChange={(e) => {
              const newMsg = e.target.value
              if(newMsg.length < 70){
              setMsg(e.target.value);
              sessionStorage.setItem('msgState', e.target.value);
              }
            }}
            className="border-4 border-black bg-gray-800 min-w-[80%] text-white rounded-3xl min-h-5 h-10 p-2 pl-3 text-2xl ml-2"
          ></input>
        </div>
        <Button
        extraStyles='h-10 pt-0 pb-0 pl-0 pr-0 hover:scale-90 text-md text-center items-center'
          onClick={() => {
            sendMessage();
            setMsg("");
            sessionStorage.setItem('msgState', "");
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Messages;
