import Image from "next/image";
import { Category } from "./page/index";

export default function Home() {
  return (
    <div className="h-screen bg-white flex flex-col">
      <div className="flex items-center justify-center">
        <Image
          src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png"
          alt="Chuck Norris"
          width={360}
          height={219}
          className="shake-on-hover mt-3 cursor-pointer"
        />
      </div>
      <div className="flex justify-center items-center h-96">
        <Category/>
        </div>
    </div>
  );
}
