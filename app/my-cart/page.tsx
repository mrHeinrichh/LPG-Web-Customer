"use client";
import { Button, CheckoutButton, Navbar } from "@/components";
import { useCartStore } from "@/states";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const { cart, deleteItems } = useCartStore() as any;

  const [itemsSelected, setitemsSelected] = useState<string[]>([]);

  const toggleItem = (item: any, checked: boolean) => {
    checked
      ? setitemsSelected((prev: any) => [item, ...prev])
      : setitemsSelected((prev: any) => [
          ...prev.filter((e: any) => e._id != item._id),
        ]);
  };

  return (
    <main>
      <Navbar />
      <Button
        onClick={() => {
          deleteItems(itemsSelected);
        }}
      >
        Delete Selected
      </Button>
      <div className="pr-56 pl-56 pt-24 pb-12">
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
          {cart.map((e: any) => {
            return (
              <div key={e._id} className="flex items-center p-16">
                <div className="w-96 h-96 relative rounded-md overflow-hidden">
                  <Image
                    src={e.image}
                    width={250}
                    height={250}
                    alt={e.image}
                    style={{ borderRadius: "15px" }}
                  ></Image>
                </div>
                <div className="">
                  <h5>{e.name}</h5>
                  <br />
                  <p>Quantity: {e.quantity}</p>
                  <br />
                  <p>₱{e.customerPrice}</p>
                </div>
                <div className="ml-80">
                  <input
                    type="checkbox"
                    style={{ transform: "scale(1.5)" }}
                    onChange={(event: any) => {
                      const { checked } = event.target;
                      toggleItem(e, checked);
                    }}
                  ></input>
                </div>
              </div>
            );
          })}

          <div className=" ">
            <CheckoutButton
              onClick={() => {
                router.push("/checkout");
              }}
            >
              Checkout
            </CheckoutButton>
          </div>
        </div>
      </div>
    </main>
  );
}
