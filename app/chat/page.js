import Button from "../components/Button";
import CustomRoomJoin from "../components/CustomRoomJoin";
import NavbarAuth from "../components/NavbarAuth";

export default function Home() {
  

  return (
    <div className="flex flex-col items-center text-white">
      <NavbarAuth userdata={null}></NavbarAuth>
      <h1 className="text-4xl mt-12 fade-in-1 underline">Join Global Chat</h1>
      <Button style="default" extraStyles="mt-10 fade-in-2" route="/chat/Global">Global Chat</Button>
      <h2 className="text-4xl mt-12 fade-in-3 underline">Or, Join A Custom Room</h2>
      <CustomRoomJoin/>
    </div>
  );
}
