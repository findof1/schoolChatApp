'use client'
import { ref, get } from 'firebase/database';
import React, { useCallback, useState, useEffect } from 'react';
import { rl } from '../firebase-config';
import { useUser } from "@clerk/clerk-react";

const RedDot = () => {
  const { user } = useUser();
  const [showRedDot, setShowRedDot] = useState(false);

  const checkNotifications = useCallback(async () => {
    if (user) {
      const notifRef = ref(
        rl,
        `notifications/${user.emailAddresses[0].emailAddress.replace(/\./g, "_")}`
      );
      const snapshot = await get(notifRef, "value");
      setShowRedDot(snapshot.val() != null);
    }
  }, [user]);

  useEffect(() => {
    checkNotifications();
  }, [checkNotifications]);

  return (
    <div>
      {showRedDot ? (
        <svg className='absolute bottom-0 right-0' height="10" width="10" xmlns="http://www.w3.org/2000/svg">
          <circle r="5" cx="5" cy="5" fill="red" />
        </svg>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RedDot;