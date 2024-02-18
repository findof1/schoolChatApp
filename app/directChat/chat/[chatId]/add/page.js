import AddUser from "@/app/components/AddUser";
import NavbarAuth from "@/app/components/NavbarAuth";

export default function Home({params}) {
  

  return (
    <div className="flex flex-col items-center text-white">
      <NavbarAuth userdata={null}></NavbarAuth>
      <h1 className="text-4xl mt-12 fade-in-1 underline">Add a User to Your Chat</h1>
      <AddUser chatId={params.chatId}/>
      
    </div>
  );
}
