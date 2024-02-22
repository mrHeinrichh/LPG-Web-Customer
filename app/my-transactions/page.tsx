"use client";
import { Navbar } from "@/components";
import { post } from "@/config";
import {
  useAuthStore,
  useCartStore,
  useCheckoutStore,
  useTransactionsStore,
} from "@/states";
import { useQRCode } from "next-qrcode";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function Home() {
  const { Canvas } = useQRCode();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart } = useCartStore() as any;
  const { user } = useAuthStore() as any;
  const { transactions, getTransactions } = useTransactionsStore() as any;
  const { checkoutItems, addItem, removeItem } = useCheckoutStore() as any;
  const [formData, setFormData] = useState({
    contactNumber: "",
  });

  useEffect(() => {
    getTransactions(`filter={"to": "${user?._id}", "__t": "Delivery"}`);
  }, [getTransactions, user?._id]); // Include getTransactions and user._id in the dependency array

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
      {transactions.map((e: any) => {
        return (
          <div
            key={e._id}
            onClick={() => {
              router.push(`/feedback?id=${e._id}`);
            }}
            className="bg-slate-600 text-white-50 p-3 rounded-lg flex items-center gap-10"
          >
            <Canvas
              text={e._id ?? ""}
              options={{
                errorCorrectionLevel: "M",
                margin: 3,
                scale: 4,
                width: 200,
              }}
            />
            <div className="flex flex-col gap-3">
              <p className="text-2xl">{e.status}</p>
              <p>P{e.total}.00</p>
            </div>
          </div>
        );
      })}
    </main>
  );
}