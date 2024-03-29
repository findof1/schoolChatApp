"use client";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect, useCallback, useContext } from "react";
import { ref, onValue, push, remove, update } from "firebase/database";
import { db, rl } from "../firebase-config";
import Button from "./Button";
import Link from "next/link";
import { FaReply } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Name from "./Name";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { OnlineUsersContext } from "./OnlineUsersContext";
import { UsersContext } from "./UsersProvider";
import { useSearchParams } from "next/navigation";

const Messages = ({ chatId = "no id", chat, path = "messages" }) => {
  const { user } = useUser();
  const [msgs, setMsgs] = useState([]);
  const [admin, setAdmin] = useState(undefined);
  const [reply, setReply] = useState(null);
  const [edit, setEdit] = useState(null);
  const [editMsg, setEditMsg] = useState("");
  const [msg, setMsg] = useState("");
  const { online, setOnline } = useContext(OnlineUsersContext);
  const { users, setUsers } = useContext(UsersContext);
  const search = useSearchParams();
  const name = search.get("name");

  useEffect(() => {
    const replyState = sessionStorage.getItem("replyState");
    const editState = sessionStorage.getItem("editState");
    const editMsgState = sessionStorage.getItem("editMsgState");
    const msgState = sessionStorage.getItem("msgState");
    if (replyState && replyState !== "null") {
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

  const validateUser = useCallback(async () => {
    const q = query(
      collection(db, "chats"),
      where(documentId(), "==", chatId),
      where("users", "array-contains", user.emailAddresses[0].emailAddress)
    );

    const doc = await getDocs(q);
    if (!doc.empty) {
      setAdmin(doc.docs[0].data().users[0]);
    }
    if (
      user.emailAddresses[0].emailAddress == "engleluc@rockfordschools.org" ||
      user.emailAddresses[0].emailAddress == "lucasengle071409@gmail.com"
    ) {
      return true;
    } else {
      return !doc.empty;
    }
  }, [user, chatId]);

  useEffect(() => {
    if (chatId != "no id") {
      if (chatId && user) {
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
    } else {
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
    sessionStorage.setItem("editState", JSON.stringify(null));
    setEditMsg("");
    sessionStorage.setItem("editMsgState", "");
    setReply(null);
    sessionStorage.setItem("replyState", null);
    const messageRef = ref(rl, `${path}/${chat}/${msgId}`);
    remove(messageRef);
  };

  const confirmEdit = () => {
    const messageRef = ref(rl, `${path}/${chat}/${edit.msgId}`);
    update(messageRef, { text: editMsg, edited: true });

    setEdit(null);
    sessionStorage.setItem("editState", JSON.stringify(null));
    setEditMsg("");
    sessionStorage.setItem("editMsgState", "");
  };

  function sendMessage() {
    if (msg) {
      push(ref(rl, `${path}/${chat}`), {
        name: user.fullName,
        id: user.id,
        email: user.emailAddresses[0].emailAddress,
        text: msg,
        replying: reply,
        date: new Date().toISOString(),
      });
      if (chatId != "no id") {
        for (let i = 0; i < users.length; i++) {
          if (!online.includes(users[i])) {
            push(ref(rl, `notifications/${users[i].replace(/\./g, '_')}`), {
              text: msg,
              from: user.fullName,
              chatName: name,
              chatId: chatId,
              fromEmail: user.emailAddresses[0].emailAddress,
              date: new Date().toISOString(),
              type: 'message'
            });
          }
        }
      }
    }
    setMsg("");

    sessionStorage.setItem("msgState", JSON.stringify(null));
    setReply(null);
    sessionStorage.setItem("replyState", JSON.stringify(null));
  }

  const calculateFontSize = (name) => {
    const baseFontSize = 16;
    const maxLength = 20;
    const minFontSize = 4;

    if (name.length > maxLength) {
      return minFontSize;
    } else {
      const fontSize = baseFontSize - (name.length - maxLength) * 0.5;
      return fontSize;
    }
  };

  function timeSince(dateString) {
    const date = new Date(dateString);
    var seconds = Math.floor((new Date() - date) / 1000);
    var intervalType;

    var interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      intervalType = "year";
    } else {
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        intervalType = "month";
      } else {
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
          intervalType = "day";
        } else {
          interval = Math.floor(seconds / 3600);
          if (interval >= 1) {
            intervalType = "hour";
          } else {
            interval = Math.floor(seconds / 60);
            if (interval >= 1) {
              intervalType = "minute";
            } else {
              interval = seconds;
              intervalType = "second";
            }
          }
        }
      }
    }

    if (interval > 1 || interval === 0) {
      intervalType += "s";
    }

    return interval + " " + intervalType + " ago";
  }

  return (
    <div className="flex flex-col w-[77%] h-full ml-[2.5%]">
      <Name chatId={chat} />
      <div className="overflow-auto w-[95%] h-[80%] mt-[1%] bg-gray-950 border-8 border-gray-800 text-xl p-4">
        {msgs.map((message, index) => (
          <div
            key={index}
            className="mb-4 ml-2 w-[97%] h-[20%] flex flex-row items-center pl-2 border-4 border-gray-700 rounded-full relative"
          >
            {message.replying ? (
              <div className="text-xs absolute top-1 right-[20%]">
                Replying To:{" "}
                {message?.replying.includes(user?.fullName)
                  ? `You: ${message.replying.split(":")[1]}`
                  : message.replying}
              </div>
            ) : (
              <></>
            )}
            <Link
              className="whitespace-nowrap"
              style={{
                fontSize: calculateFontSize(
                  message.name === user?.fullName ? "You" : message.name
                ),
              }}
              href={`/user?email=${message.email}&name=${message.name}`}
            >
              {message.name === user?.fullName ? "You" : message.name}:{" "}
            </Link>
            {message.date ? (
              <p className="absolute bottom-1 left-4 text-[9px]">
                {timeSince(message.date)}
              </p>
            ) : (
              <></>
            )}
            {message.text.length < 70 ? (
              <p className="ml-2">{message.text}</p>
            ) : (
              <p className="ml-2 w-[70%] text-xs break-words">{message.text}</p>
            )}
            <p className="ml-2 text-md mt-auto mb-2">
              {message.edited ? "\u0022edited\u0022" : ""}
            </p>
            {user?.id == message.id ? (
              <Button
                style="xs"
                extraStyles="ml-auto mr-3"
                onClick={() => {
                  setReply(null);
                  sessionStorage.setItem("replyState", JSON.stringify(null));
                  setEdit(message);
                  sessionStorage.setItem("editState", JSON.stringify(message));
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
                sessionStorage.setItem("editState", JSON.stringify(null));
                setReply(message.name + ": " + message.text);
                sessionStorage.setItem(
                  "replyState",
                  message.name + ": " + message.text
                );
              }}
            >
              <FaReply className="h-4 w-3" />
            </Button>
            {user?.id == message.id ||
            user?.emailAddresses[0].emailAddress ==
              "engleluc@rockfordschools.org" ||
            user?.emailAddresses[0].emailAddress ==
              "lucasengle071409@gmail.com" ||
            (user?.emailAddresses[0].emailAddress == admin &&
              admin &&
              (message.email != "engleluc@rockfordschools.org" ||
                message.email != "lucasengle071409@gmail.com")) ? (
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
            Changing: {edit.name == user?.fullName ? "You: " : `${edit.name}: `}
            {edit.text}, to:
          </p>
          <div className="w-[55%] flex flex-row items-center">
            <input
              value={editMsg}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  confirmEdit();
                }
                if (e.key == "Escape") {
                  setEdit(null);
                  sessionStorage.setItem("editState", JSON.stringify(null));
                  setEditMsg("");
                  sessionStorage.setItem("editMsgState", "");
                }
              }}
              onChange={(e) => {
                const newMsg = e.target.value;
                if (newMsg.length < 300) {
                  setEditMsg(e.target.value);
                  sessionStorage.setItem("editMsgState", e.target.value);
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
              sessionStorage.setItem("editState", JSON.stringify(null));
              setEditMsg("");
              sessionStorage.setItem("editMsgState", "");
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
          <p className="ml-4">
            Replying to:{" "}
            {reply.includes(user?.fullName)
              ? `You: ${reply.split(":")[1]}`
              : reply}
          </p>{" "}
          <Button
            style="none"
            extraStyles="text-xs ml-auto mr-5"
            onClick={() => {
              setReply(null);
              sessionStorage.setItem("replyState", JSON.stringify(null));
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
              if (e.key === "Enter") {
                sendMessage();
                setMsg("");
                sessionStorage.setItem("msgState", "");
              }
            }}
            onChange={(e) => {
              const newMsg = e.target.value;
              if (newMsg.length < 300) {
                setMsg(e.target.value);
                sessionStorage.setItem("msgState", e.target.value);
              }
            }}
            className="border-4 border-black bg-gray-800 min-w-[80%] text-white rounded-3xl min-h-5 h-10 p-2 pl-3 text-2xl ml-2"
          ></input>
        </div>
        <Button
          extraStyles="h-10 pt-0 pb-0 pl-0 pr-0 hover:scale-90 text-md text-center items-center"
          onClick={() => {
            sendMessage();
            setMsg("");
            sessionStorage.setItem("msgState", "");
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Messages;
