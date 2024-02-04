"use client";
import { Button, InputField, Navbar } from "@/components";
import { post } from "@/config";
import { API_URL } from "@/env";
import { useAuthStore, useCartStore, useCheckoutStore } from "@/states";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Checkout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart } = useCartStore() as any;
  const { user } = useAuthStore() as any;
  const { checkoutItems, addItem, removeItem } = useCheckoutStore() as any;

  const [formData, setFormData] = useState({
    contactNumber: "",
  });

  useEffect(() => {
    console.log(checkoutItems);
  }, [checkoutItems]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
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
      <InputField
        name="contactNumber"
        placeholder="Contact Number"
        onChange={handleChange}
      />
      {checkoutItems.map((e: any) => {
        return (
          <div key={e._id}>
            <p>Name: {e.name}</p>
            <p>Quantity: {e.quantity}</p>
            <Image src={e.image} width={250} height={250} alt={e.image}></Image>
          </div>
        );
      })}
      <Button
        onClick={() => {
          createTransaction();
        }}
      >
        Order Now
      </Button>
    </main>
  );
}
