import Messages from "@/app/components/Messages";
import NavbarAuth from "@/app/components/NavbarAuth";
import { OnlineUsersProvider } from "@/app/components/OnlineUsersContext";
import { UsersProvider } from "@/app/components/UsersProvider";

export default function Home({params}) {

  return (
    <div className="flex flex-col h-full w-full items-center text-white">
      <NavbarAuth userdata={null}></NavbarAuth>
      <h1 className="text-4xl fade-in-1 underline mt-[1%]"></h1>
      <div className='w-full h-[90%] flex flex-col items-center'>
      <UsersProvider>
        <OnlineUsersProvider>
          <Messages chat={params.chat}/>
        </OnlineUsersProvider> 
      </UsersProvider>
      </div>
    </div>
  );
}
