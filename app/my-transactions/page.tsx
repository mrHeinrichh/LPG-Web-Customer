"use client";
import { Navbar } from "@/components";
import { useAuthStore, useTransactionsStore } from "@/states";
import { parseToFiat } from "@/utils";
import { useQRCode } from "next-qrcode";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MyTransactions() {
  const { Canvas } = useQRCode();
  const router = useRouter();
  const { user } = useAuthStore() as any;
  const { transactions, getTransactions } = useTransactionsStore() as any;

  useEffect(() => {
    getTransactions(`filter={"to": "${user?._id}", "__t": "Delivery"}`);
  }, [getTransactions, user?._id]); // Include getTransactions and user._id in the dependency array

  return (
    <main>
      <Navbar />
      <div className="pr-56 pl-56 p-16">
        <h4 className="flex justify-center items-center font-bold">
          My Transaction History
        </h4>
        {transactions.map((e: any, index: number) => {
          return (
            <div key={e._id}>
              <div
                onClick={() => {
                  router.push(`/feedback?id=${e._id}`);
                }}
                className="p-3 rounded-lg flex items-center gap-10 pr-28 pl-28 pt-16 pb-16 shadow-xl cursor-pointer"
                style={{ backgroundColor: "#ffffff" }}
              >
                <div className="flex flex-col gap-3">
                  <p className="text-2xl font-bold">{`Order #${
                    transactions.length - index
                  }`}</p>
                  <Canvas
                    text={e._id ?? ""}
                    options={{
                      errorCorrectionLevel: "M",
                      margin: 3,
                      scale: 4,
                      width: 200,
                    }}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-2xl">Transaction Number: {e._id}</p>
                  <p className="text-2xl">Order Status: {e.status}</p>
                  <p className="text-2xl">
                    Total Price: {parseToFiat(e.total)}
                  </p>
                </div>
              </div>
              {index < transactions.length - 1 && (
                <hr className="border-t my-4 w-full" />
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
