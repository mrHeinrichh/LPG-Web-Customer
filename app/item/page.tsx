"use client";
import { Button, Navbar } from "@/components";
import { get } from "@/config";
import { API_URL } from "@/env";
import { useCartStore } from "@/states";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart, addToCart } = useCartStore() as any;
  const id = searchParams.get("id");
  const [item, setitem] = useState<any>({
    name: "",
    category: "",
    description: "",
    weight: 0,
    quantity: 1,
    customerPrice: 0,
    retailerPrice: 0,
    image: "",
    type: "",
  });
  const [quantity, setquantity] = useState<number>(1);

  useEffect(() => {
    const start = async () => {
      try {
        const { data } = await get(`items/${id}`);

        if (data.status === "success") {
          setitem({
            name: data.data[0].name ?? "",
            category: data.data[0].category ?? "",
            description: data.data[0].description ?? "",
            weight: data.data[0].weight ?? 0,
            quantity: data.data[0].quantity ?? 0,
            customerPrice: data.data[0].customerPrice ?? 0,
            retailerPrice: data.data[0].retailerPrice ?? 0,
            image: data.data[0].image ?? "",
            type: data.data[0].type ?? "",
          });
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    start();
  }, []);

  const increment = () => {
    setquantity((prev: any) => prev + 1);
  };

  const decrement = () => {
    setquantity((prev: any) => prev - 1);
  };

  return (
    <main>
      <Navbar />
      <div className="flex gap-5">
        <div className="">
          <Image
            src={item.image}
            width={250}
            height={250}
            alt={item.image}
          ></Image>
          <p>{item.description}</p>
        </div>

        <div className="flex flex-col">
          <p>{item.name}</p>
          <p>₱{item.customerPrice}</p>
          <p>Quantity</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <p className="text-4xl" onClick={decrement}>
                -
              </p>
              <p>{quantity}</p>
              <p className="text-3xl" onClick={increment}>
                +
              </p>
            </div>
            <p>Stock Available: {item.quantity}</p>
          </div>

          <Button
            onClick={() => {
              addToCart({ ...item, quantity });
            }}
          >
            Add to Cart
          </Button>
          <Button>Buy Now</Button>
        </div>
      </div>
    </main>
  );
}
