import NavbarAuth from "@/app/components/NavbarAuth";
import Notifications from "../components/Notifications";

export default function Home({params}) {
  

  return (
    <div className="flex flex-col items-center text-white h-full w-full">
      <NavbarAuth userdata={null}></NavbarAuth>
      <h1 className="text-4xl mt-12 fade-in-1 underline">Notifications</h1>
      <Notifications></Notifications>
    </div>
  );
}
