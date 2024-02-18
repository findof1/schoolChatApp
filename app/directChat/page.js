import Button from "../components/Button";
import ChatRequests from "../components/ChatRequests";
import Chats from "../components/Chats";
import NavbarAuth from "../components/NavbarAuth";

export default function Home() {
  

  return (
    <div className="flex flex-col items-center text-white h-full w-full">
      <NavbarAuth userdata={null}></NavbarAuth>
      <Button extraStyles="absolute top-[11%] left-[37%] lg:left-[45%] fade-in-1" style="sm" route='/directChat/create'>Create a Direct Chat</Button>
      <div className="mt-5 h-[80%] w-full flex flex-row ">
        <Chats></Chats>
        <ChatRequests/>
        
      </div>
    </div>
  );
}
