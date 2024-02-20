import Messages from "@/app/components/Messages";
import NavbarAuth from "@/app/components/NavbarAuth";
import Users from "@/app/components/Users";



export default function Home({chatId}) {


  return (
    <>
    <NavbarAuth userdata={null}></NavbarAuth>
    <div className="flex flex-col items-center text-white h-[90%] w-full">
      
      <div className="flex flex-row h-full w-full">
      <Messages chat={chatId} chatId={chatId} path="direct"></Messages>
      <Users id={chatId}/>
      </div>
    </div>
    </>
  );
}
