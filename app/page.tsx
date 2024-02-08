"use client";
import { Announcements, Navbar } from "@/components";
import { useItemStore } from "@/states";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { items, getItems } = useItemStore() as any;

  useEffect(() => {
    getItems();
  }, []);

  return (
    <main>
      <Navbar />
      <Announcements />

      {/* <div className="flex flex-nowrap overflow-x-auto ">
        {announcements.map((e: any) => {
          return (
            <div className="w-screen bg-red-700 p-2" key={e._id}>
              <p>{e.text}</p>
            </div>
          );
        })}
      </div> */}
      <div className="w-full grid grid-cols-4 gap-10 place-items-center p-5">
        {items.map((e: any) => (
          <div
            key={e._id}
            onClick={() => {
              router.push(`/item?id=${e._id}`);
            }}
          >
            <Image src={e.image} width={150} height={150} alt={e.image}></Image>
            <p>{e.name}</p>
            <p className="font-bold">₱{e.customerPrice}.00</p>
          </div>
        ))}
      </div>
    </main>
  );
}
