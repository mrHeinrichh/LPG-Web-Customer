"use client";
import { Navbar } from "@/components";
import { useAuthStore, useTransactionsStore } from "@/states";
import { useEffect } from "react";
import { TransactionsList } from "./components";

export default function MyTransactions() {
  const { user } = useAuthStore() as any;
  const { getTransactions } = useTransactionsStore() as any;

  useEffect(() => {
    getTransactions(`filter={"to": "${user?._id}", "__t": "Delivery"}`);
  }, [getTransactions, user?._id]);

  return (
    <main>
      <Navbar />
      <div className="p-10">
        <h4 className="font-bold">My Transaction History</h4>
        <TransactionsList />
      </div>
    </main>
  );
}
