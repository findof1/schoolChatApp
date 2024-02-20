import Button from "@/app/components/Button";
import ChangeName from "@/app/components/ChangeName";
import LeaveChat from "@/app/components/LeaveChat";
import NavbarAuth from "@/app/components/NavbarAuth";

export default function Home({params}) {
  

  return (
    <div className="flex flex-col items-center text-white">
      <NavbarAuth userdata={null}></NavbarAuth>
      <h1 className="text-4xl mt-12 fade-in-1 underline">Chat Settings</h1>
      <h1 className="text-xl mt-16 fade-in-1 underline">Change Chat Name</h1>
      <ChangeName chatId={params.chatId}></ChangeName>
      <LeaveChat chatId={params.chatId}/>
    </div>
  );
}
