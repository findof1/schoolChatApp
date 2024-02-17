import Button from "./components/Button";
import NavbarAuth from "./components/NavbarAuth";
import Link from 'next/link'

export default function Home() {
  

  return (
    <div className="flex flex-col items-center text-white">
      <p className="absolute bottom-0 left-0 text-[10px]">By using this app, you automatically agree to the <Link href='/tos' className="text-blue-400 underline">terms of service</Link></p>
      <NavbarAuth userdata={null}></NavbarAuth>
      <h1 className="text-7xl mt-32 fade-in-1">Chat Site</h1>
      <p className="text-4xl text-center mt-10 fade-in-3">
        Click the button below to get started and begin<br/><br/> chatting with other people.
      </p>
      <Button route="/chat" style="submit" extraStyles="mt-8 w-48 h-12 text-xl fade-in-5">Start Chatting</Button>
    </div>
  );
}
