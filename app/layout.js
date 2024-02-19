import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import {dark} from "@clerk/themes";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chat Site",
  description: "A website for you to chat with other people in real time!",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={dark}>
      <html lang="en">
        <body className={`${inter.className} h-[95vh] w-full bg-gradient-to-r from-gray-950 to-gray-900`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
