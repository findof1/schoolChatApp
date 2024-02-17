import NavbarAuth from "../components/NavbarAuth";


export default function Home() {
  

  return (
    <div className="flex flex-col items-center text-white">
      <NavbarAuth userdata={null}></NavbarAuth>
      <p className="underline text-4xl">Terms Of Service</p>
      <p className="text-lg text-center w-[50%]">We are allowed to take down your account or posts at any time for any reason. <br/>Do not discuss illigal activity, or your account will be terminated.<br/> We can see all information you send or login with, but we do not share this information with third party services.<br/> Thats it!</p>
    </div>
  );
}
