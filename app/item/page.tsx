"use client";
import { Button, Navbar } from "@/components";
import { get } from "@/config";
import { API_URL } from "@/env";
import { useCartStore } from "@/states";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
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
    stock: 0,
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
            stock: data.data[0].stock ?? 0,
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
    if (quantity < item.stock) {
      setquantity((prev: any) => prev + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setquantity((prev: any) => prev - 1);
    }
  };

  return (
    <main>
      <Navbar />
      <div className="flex gap-5 h-96 m-10">
        <div className="w-1/3 relative">
          <Image src={item.image} fill alt={item.image} />
        </div>

        <div className="flex flex-col justify-evenly w-2/3">
          <p className="text-2xl font-bold">{item.name}</p>
          <p className="text-3xl">₱{item.customerPrice}.00</p>
          <p className="">{item.description}</p>
          <div className="flex justify-between items-center">
            <p>Stock Available: {item.stock ?? 0}</p>

            <div className="flex items-center gap-3">
              <CiCircleMinus onClick={decrement} size={30} />
              <p className="text-xl">{quantity}</p>
              <CiCirclePlus onClick={increment} size={30} />
            </div>
          </div>

          <Button
            onClick={() => {
              addToCart({ ...item, quantity });
              router.push("/my-cart");
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </main>
  );
}
