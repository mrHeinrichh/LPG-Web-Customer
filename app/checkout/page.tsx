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
    name: "",
    houseLotBlk: "",
    baranggay: "",
    paymentMethod: "",
  });
  const [discountIdImage, setdiscountIdImage] = useState<null | string>(null);
  const [assembly, setassembly] = useState<boolean>(false);

  useEffect(() => {
    console.log(checkoutItems);
  }, [checkoutItems]);

  const fileChange = async (event: any) => {
    const form = new FormData();
    form.append("image", event.target.files[0]);
    const { data } = await post<FormData>("upload/image", form);
    if (data.status == "success") {
      setdiscountIdImage(data.data[0]?.path ?? "");
    }
  };

  const handleChange = (event: any) => {
    const { name, value, checked } = event.target;
    if (name == "assembly") {
      setassembly(checked);
      return;
    }
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const createTransaction = async () => {
    console.log({
      ...formData,
      assembly,
    });

    // const { data } = await post("transactions", {
    //   to: user?._id ?? "",
    //   items: cart,
    //   ...formData,
    // });

    // if (data.status == "success") router.push("/");
  };
  return (
    <main>
      <Navbar />
      <InputField
        name="contactNumber"
        placeholder="Contact Number"
        onChange={handleChange}
      />{" "}
      <InputField name="name" placeholder="Full Name" onChange={handleChange} />{" "}
      <InputField
        name="houseLotBlk"
        placeholder="House | Lot | Blk."
        onChange={handleChange}
      />{" "}
      <InputField
        name="baranggay"
        placeholder="Baranggay"
        onChange={handleChange}
      />
      <div className="flex flex-col gap-3">
        <p className="text-xl font-bold">Choose Payment Method</p>
        <div className="flex items-center gap-3">
          <InputField
            type="radio"
            name="paymentMethod"
            value="COD"
            placeholder="Cash on Delivery"
            onChange={handleChange}
          />
          <InputField
            type="radio"
            name="paymentMethod"
            value="GCASH"
            placeholder="GCASH"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-xl font-bold">Needs to be assembled?</p>
        <div className="flex items-center gap-3">
          <InputField
            type="checkbox"
            name="assembly"
            placeholder="Yes"
            onChange={handleChange}
          />
        </div>
      </div>
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
