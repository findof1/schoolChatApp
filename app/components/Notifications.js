"use client";
import { onValue, ref, remove } from "firebase/database";
import { rl } from "../firebase-config";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import Link from "next/link";
import Button from "./Button";
import { FaTrashAlt } from "react-icons/fa";

const Notifications = () => {
  const { user } = useUser();
  const [notifications, setNotifications] = useState([]);

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

  useEffect(() => {
    if (user) {
      const notificationsRef = ref(
        rl,
        `notifications/${user.emailAddresses[0].emailAddress.replace(
          /\./g,
          "_"
        )}`
      );
      onValue(notificationsRef, (snapshot) => {
        const data = snapshot.val();
        const notificationsList = Object.keys(data || {}).map((key) => ({
          ...data[key],
          id: key,
        }));
        notificationsList.reverse()
        setNotifications(notificationsList);
      });
    }
  }, [user]);

  const deleteNotif = (notif) => {
    const notifRef = ref(
      rl,
      `notifications/${user.emailAddresses[0].emailAddress.replace(
        /\./g,
        "_"
      )}/${notif.id}`
    );
    remove(notifRef)
      .then(() => {
        setNotifications(notifications.filter(n => n.id !== notif.id));
      })
      .catch((error) => {
        console.error("Error deleting notification: ", error);
      });
  };

  return (
    <div className="overflow-auto min-w-[95%] w-[95%] min-h-[70%] h-[70%] mt-[1%] bg-gray-950 border-8 border-gray-800 text-xl p-4">
      {notifications.map((notification, index) => (
        <>
        {(notification.type == 'message' || notification.type == undefined) ? 
        <div
          key={index}
          className="mb-4 ml-2 w-[97%] h-[12%] flex flex-row items-center border-4 border-gray-700 rounded-full relative content-between justify-between pl-5 pr-10"
        >
          <div className="flex flex-row">
            <p className="text-xl">Chat: <Link href={`/directChat/chat/${notification.chatId}?name=${notification.chatName}`} className='text-blue-600 underline'>{notification.chatName}</Link></p>{" "}
            <p className="text-md ml-10">
              From:{" "}
              <Link
                href={`/user?name=${
                  notification.from
                }&email=${notification.fromEmail}`}
              >
                {notification.from}
              </Link>
            </p>{" "}
            <p className='ml-10'>{timeSince(notification.date)}</p>
          </div>
          <div className='flex flex-row items-center'>
          <p className="text-sm max-w-[80%] mr-20 ml-auto line-clamp-1">
            Message: {notification.text.length > 25 ? notification.text.substring(0,25) + '...': notification.text}
          </p>
          <Button onClick={()=>{deleteNotif(notification)}} style="square" extraStyles="min-w-8 w-8 h-8 min-h-8 ml-5 flex flex-col items-center">
            <FaTrashAlt className='min-w-4 w-4 h-4 min-h-4 justify-center mt-[20%]'/>
          </Button>
          </div>
        </div>
      :         
      <div
      key={index}
      className="mb-4 ml-2 w-[97%] h-[12%] flex flex-row items-center border-4 border-gray-700 rounded-full relative content-between justify-between pl-5 pr-10"
    >
      <div className="flex flex-row">
        <p className="text-md">
          <Link
            href={`/user?name=${
              notification.from
            }&email=${notification.fromEmail}`}
            
          >
            {notification.from}
          </Link> sent you a Chat Request
        </p>{" "}
        <p className='ml-10'>{timeSince(notification.date)}</p>
        <Link href='/directChat' className='text-blue-600 underline ml-10'>Check It Out</Link>
      </div>
      <div className='flex flex-row items-center'>
      <Button onClick={()=>{deleteNotif(notification)}} style="square" extraStyles="min-w-8 w-8 h-8 min-h-8 ml-5 flex flex-col items-center">
        <FaTrashAlt className='min-w-4 w-4 h-4 min-h-4 justify-center mt-[20%]'/>
      </Button>
      </div>
    </div>}
      </>
      ))}
    </div>
  );
};

export default Notifications;
