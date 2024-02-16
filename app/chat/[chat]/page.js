import Messages from "@/app/components/Messages";
import NavbarAuth from "@/app/components/NavbarAuth";

export default function Home({params}) {

  return (
    <div className="flex flex-col h-screen w-screen items-center text-white">
      <NavbarAuth userdata={null}></NavbarAuth>
      <h1 className="text-4xl mt-8 fade-in-1 underline">Chatroom: {params.chat}</h1>
      <Messages chat={params.chat}/>
    </div>
  );
}
