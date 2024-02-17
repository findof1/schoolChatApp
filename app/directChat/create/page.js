import NavbarAuth from "@/app/components/NavbarAuth";
import CreateChatReq from "@/app/components/CreateChatReq";

export default function Home() {
  

  return (
    <div className="flex flex-col items-center text-white">
      <NavbarAuth userdata={null}></NavbarAuth>
      <h1 className="text-4xl mt-12 fade-in-1 underline">Create A Direct Chat</h1>
      <CreateChatReq/>
      
    </div>
  );
}
