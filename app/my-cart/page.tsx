"use client";
import { CheckoutButton, InputField, Navbar } from "@/components";
import { post } from "@/config";
import { API_URL } from "@/env";
import { useAuthStore, useCartStore, useCheckoutStore } from "@/states";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart } = useCartStore() as any;
  const { user } = useAuthStore() as any;
  const { checkoutItems, addItem, removeItem } = useCheckoutStore() as any;
  const [formData, setFormData] = useState({
    contactNumber: "",
  });

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const toggleItem = (item: any, checked: boolean) => {
    checked ? addItem(item) : removeItem(item._id);
  };

  const createTransaction = async () => {
    console.log({
      to: user ?? "",
      items: cart,
      ...formData,
    });

    const { data } = await post("transactions", {
      to: user?._id ?? "",
      items: cart,
      ...formData,
    });

    if (data.status == "success") router.push("/");
  };

  return (
    <main>
      <Navbar />
      <div className="pr-56 pl-56 pt-24 pb-12">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
      {cart.map((e: any) => {
        return (
          <div key={e._id} className="flex items-center p-16">
<div className="w-96 h-96 relative rounded-md overflow-hidden">
              <Image src={e.image} width={250} height={250} alt={e.image}style={{ borderRadius: "15px" }} ></Image>
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
