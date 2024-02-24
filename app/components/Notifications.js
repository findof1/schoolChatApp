"use client";
import { onValue, ref } from "firebase/database";
import { rl } from "../firebase-config";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import Link from "next/link";

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

  return (
    <div className="overflow-auto min-w-[95%] w-[95%] min-h-[70%] h-[70%] mt-[1%] bg-gray-950 border-8 border-gray-800 text-xl p-4">
      {notifications.map((notification, index) => (
        <div
          key={index}
          className="mb-4 ml-2 w-[97%] h-[12%] flex flex-row items-center border-4 border-gray-700 rounded-full relative content-between justify-between pl-5 pr-20"
        >
          <div className="flex flex-row">
            <p className="text-xl">Chat: <Link href={`/directChat/chat/${notification.chatId}?name=${notification.chatName}`}>{notification.chatName}</Link></p>{" "}
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
          <p className="text-sm line-clamp-1 overflow-hidden overflow-ellipsis max-w-[35%]">
            Message: {notification.text.length > 25 ? notification.text.substring(0,25) + '...': notification.text}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
