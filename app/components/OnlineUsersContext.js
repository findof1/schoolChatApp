'use client';
import React, { createContext, useState } from 'react';

export const OnlineUsersContext = createContext();

export const OnlineUsersProvider = ({ children }) => {
  const [online, setOnline] = useState([]);

  return (
    <OnlineUsersContext.Provider value={{ online, setOnline }}>
      {children}
    </OnlineUsersContext.Provider>
  );
};