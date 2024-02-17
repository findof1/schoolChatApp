import Messages from "@/app/components/Messages";
import Name from "@/app/components/Name";
import NavbarAuth from "@/app/components/NavbarAuth";


export default function Home({params}) {


  return (
    <div className="flex flex-col items-center text-white h-full w-full">
      <NavbarAuth userdata={null}></NavbarAuth>
      <Name/>
      <Messages chat={params.chatId} path="direct"></Messages>
    </div>
  );
}
