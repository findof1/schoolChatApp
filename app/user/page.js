'use client'
import NavbarAuth from "@/app/components/NavbarAuth";
import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

export default function Home() {
  const params = useSearchParams()
  const name = params.get('name')
  const email = params.get('email')

  return (
    <div className="flex flex-col items-center text-white">
      <NavbarAuth userdata={null}></NavbarAuth>
      <h1 className="text-5xl mt-10 underline fade-in-1">User</h1>
      <p className="text-4xl mt-10 fade-in-3">Name: {name}</p>
      <p className="text-2xl mt-10 fade-in-5">Email: {email}</p>
    </div>
  );
}
