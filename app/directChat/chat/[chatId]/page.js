import Messages from "@/app/components/Messages";
import NavbarAuth from "@/app/components/NavbarAuth";
import { OnlineUsersProvider } from "@/app/components/OnlineUsersContext";
import Users from "@/app/components/Users";
import { UsersProvider } from "@/app/components/UsersProvider";



export default function Home({params}) {


  return (
    <>
    <NavbarAuth userdata={null}></NavbarAuth>
    <div className="flex flex-col items-center text-white h-[90%] w-full">
      
      <div className="flex flex-row h-full w-full">
      <UsersProvider>
        <OnlineUsersProvider>
          <Messages chat={params.chatId} chatId={params.chatId} path="direct"></Messages>
          <Users id={params.chatId}/>
        </OnlineUsersProvider>
      </UsersProvider>
      </div>
    </div>
    </>
  );
}
