import { create } from "zustand";
import { initialState } from "./initialState";
import { itemRepository } from "@/repositories";
import { HomeStore } from "./types";

export default create<HomeStore>((set) => ({
  ...initialState,
  setNavbarVisible: ({ value }) => {
    return set(() => ({ navbarVisible: value }));
  },
  getItems: async ({ page = 1, limit = 10 }) => {
    const { data, status } = await itemRepository.getItems({ page, limit });
    if (status == "success") {
      return set(() => ({
        items: data,
        brandNewTanks: data.filter((e: any) => e.category == "Brand New Tanks"),
        refillTanks: data.filter((e: any) => e.category == "Refill Tanks"),
        accessories: data.filter((e: any) => e.category == "Accessories"),
      }));
    }
  },
}));
