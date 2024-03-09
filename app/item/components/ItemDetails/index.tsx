"use client";
import { Button } from "@/components";
import React from "react";
import { parseToFiat } from "@/utils";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import Image from "next/image";
import { useCartStore, useItemStore } from "@/states";
import { useRouter } from "next/navigation";

export interface IItemDetailsProps {}

function ItemDetails({}: IItemDetailsProps) {
  const router = useRouter();
  const { item, quantity, increment, decrement } = useItemStore();
  const { addToCart } = useCartStore();

  const currentHour = new Date().getHours();
  const isWithinWorkingHours = currentHour >= 7 && currentHour < 19; // 7am to 7pm

  return (
    <div className="h-fit flex justify-center items-center p-20 pt-10">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-20 w-full">
        <div className="flex gap-20">
          <div className="w-96 h-96 relative rounded-md overflow-hidden">
            <Image src={item.image} fill alt={item.image} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col justify-evenly w-2/3">
            <p className="text-2xl font-bold">{item.name}</p>
            <p className="text-3xl">{parseToFiat(item.customerPrice)}</p>
            <p className="">{item.description}</p>
            <div className="flex justify-between items-center">
              <p>Stock Available: {item.stock ?? 0}</p>

              <div className="flex items-center gap-3">
                <CiCircleMinus
                  onClick={() => {
                    decrement();
                  }}
                  size={30}
                />
                <p className="text-xl">{quantity}</p>
                <CiCirclePlus
                  onClick={() => {
                    increment(item.stock);
                  }}
                  size={30}
                />
              </div>
            </div>

            {/* {isWithinWorkingHours ? ( */}
              <Button
                onClick={() => {
                  addToCart(item, quantity);
                  router.push("/my-cart");
                }}
              >
                Add to Cart
              </Button>
            {/* // ) : (
            //   <p className="text-red-500">Ordering is only available between 7am and 7pm.</p>
            // )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;
