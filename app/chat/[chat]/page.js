import Messages from "@/app/components/Messages";
import NavbarAuth from "@/app/components/NavbarAuth";

export default function Home({params}) {

  return (
    <div className="flex flex-col h-full w-full items-center text-white">
      <NavbarAuth userdata={null}></NavbarAuth>
      <h1 className="text-4xl fade-in-1 underline mt-[1%]"></h1>
      <Messages chat={params.chat}/>
    </div>
  );
}
