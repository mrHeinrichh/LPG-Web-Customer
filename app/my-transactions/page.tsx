"use client";
import { Navbar } from "@/components";
import { useAuthStore, useTransactionStore } from "@/states";
import { useEffect } from "react";
import { TransactionsList } from "./components";

export default function MyTransactions() {
  const { user } = useAuthStore() as any;
  const { getTransactions } = useTransactionStore() as any;

  useEffect(() => {
    getTransactions(`filter={"to": "${user?._id}", "__t": "Delivery"}`);
  }, [getTransactions, user?._id]);

  return (
    <main>
      <Navbar />
      <div className="p-5">
        <TransactionsList />
      </div>
    </main>
  );
}
