import { SignUp } from "@clerk/nextjs";

 
export default function Page() {
  return (
  <div className="h-full w-screen flex flex-col mt-20 items-center justify-center">
    <SignUp />
  </div>
  );
}