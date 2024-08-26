import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center px-4">
      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-black text-center mt-20 sm:mt-32 lg:mt-52">
        Manage your Inventory Here
      </h1>
      <div className="flex flex-col sm:flex-row justify-center items-center mt-8">
        <Link href={"/checkin"}>
          <Button
            variant="default"
            className="w-full sm:w-[40vw] lg:w-[20vw] mx-1 my-3 sm:my-5"
          >
            Check in
          </Button>
        </Link>
        <Link href={"/checkout"}>
          <Button
            variant="default"
            className="w-full sm:w-[40vw] lg:w-[20vw] mx-1 my-3 sm:my-5"
          >
            Check out
          </Button>
        </Link>
      </div>
    </main>
  );
}
