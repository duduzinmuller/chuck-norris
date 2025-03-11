import Image from "next/image";
import { Category } from "./page/index";

export default function Home() {
  return (
    <div className="flex h-screen flex-col bg-white">
      <div className="flex items-center justify-center">
        <Image
          src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png"
          alt="Chuck Norris"
          width={360}
          height={219}
          className="shake-on-hover mt-3 cursor-pointer"
        />
      </div>
      <div className="flex h-96 items-center justify-center">
        <Category />
      </div>
    </div>
  );
}
