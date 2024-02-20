"use client";
import { Announcements, Navbar } from "@/components";
import { useItemStore } from "@/states";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function Home() {
  const router = useRouter();
  const { items, getItems } = useItemStore() as any;
  const brandNewTanks = useMemo(
    () => items.filter((e: any) => e.category == "Brand New Tanks"),
    [items]
  );
  const refillTanks = useMemo(
    () => items.filter((e: any) => e.category == "Refill Tanks"),
    [items]
  );
  const accessories = useMemo(
    () => items.filter((e: any) => e.category == "Accessories"),
    [items]
  );
  useEffect(() => {
    getItems();
  }, []);

  return (
    <main>
      <Navbar />
      <Announcements />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <p className="font-bold">Brand New Tanks</p>
          <div className="flex items-center gap-4">
            {brandNewTanks.map((e: any) => (
              <div
                key={e._id}
                onClick={() => {
                  router.push(`/item?id=${e._id}`);
                }}
              >
                <Image
                  src={e.image}
                  width={150}
                  height={150}
                  alt={e.image}
                ></Image>
                <p>{e.name}</p>
                <p className="font-bold">₱{e.customerPrice}.00</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-bold">Refill Tanks</p>
          <div className="flex items-center gap-4">
            {refillTanks.map((e: any) => (
              <div
                key={e._id}
                onClick={() => {
                  router.push(`/item?id=${e._id}`);
                }}
              >
                <Image
                  src={e.image}
                  width={150}
                  height={150}
                  alt={e.image}
                ></Image>
                <p>{e.name}</p>
                <p className="font-bold">₱{e.customerPrice}.00</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-bold">Accessories</p>
          <div className="flex items-center gap-4">
            {accessories.map((e: any) => (
              <div
                key={e._id}
                onClick={() => {
                  router.push(`/item?id=${e._id}`);
                }}
              >
                <Image
                  src={e.image}
                  width={150}
                  height={150}
                  alt={e.image}
                ></Image>
                <p>{e.name}</p>
                <p className="font-bold">₱{e.customerPrice}.00</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
