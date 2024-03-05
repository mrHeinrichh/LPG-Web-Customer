import { transactionRepository } from "@/repositories";
import { create } from "zustand";
import { TransactionStore } from "./types";
import { initialState } from "./initialState";

export default create<TransactionStore>((set) => ({
  ...initialState,
  getTransactions: async (query: string) => {
    const { data, status } = await transactionRepository.getTransactions(query);
    if (status == "success") {
      return set(() => ({
        transactions: data,
      }));
    }
  },
}));
