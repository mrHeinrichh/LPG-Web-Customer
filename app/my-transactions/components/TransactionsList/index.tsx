import { IDeliveryModel } from "@/models";
import { useTransactionStore } from "@/states";
import React from "react";
import TransactionCard from "../TransactionCard";

function TransactionsList() {
  const { transactions } = useTransactionStore() as any;

  return (
    <div className="flex flex-col gap-2 p-5">
      {transactions.map((e: IDeliveryModel<string, string>, index: number) => {
        return (
          <TransactionCard
            key={e._id ?? ""}
            delivery={e}
            orderNumber={transactions.length - index}
          />
        );
      })}
    </div>
  );
}

export default TransactionsList;
