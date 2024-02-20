import Messages from "@/app/components/Messages";
import NavbarAuth from "@/app/components/NavbarAuth";
import Users from "@/app/components/Users";



export default function Home({params}) {


  return (
    <>
    <NavbarAuth userdata={null}></NavbarAuth>
    <div className="flex flex-col items-center text-white h-[90%] w-full">
      
      <div className="flex flex-row h-full w-full">
      <Messages chat={params.chatId} chatId={params.chatId} path="direct"></Messages>
      <Users id={params.chatId}/>
      </div>
    </div>
    </>
  );
}
