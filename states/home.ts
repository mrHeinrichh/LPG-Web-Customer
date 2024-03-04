import { IItemModel } from "@/models";
import { IQuery, getItems } from "@/repositories";
import { create } from "zustand";

export interface SetNavbarVisibleArgs {
  value: boolean;
}

export interface IHomeStore {
  navbarVisible: boolean;
  setNavbarVisible: ({}: SetNavbarVisibleArgs) => void;
  getItems: ({}: IQuery) => Promise<void>;
  items: IItemModel[];
  brandNewTanks: IItemModel[];
  refillTanks: IItemModel[];
  accessories: IItemModel[];
}

export default create<IHomeStore>((set) => ({
  navbarVisible: true,
  setNavbarVisible: ({ value }) => {
    return set(() => ({ navbarVisible: value }));
  },
  items: [],
  brandNewTanks: [],
  refillTanks: [],
  accessories: [],
  getItems: async ({ page = 1, limit = 10 }) => {
    const { data, status } = await getItems({ page, limit });
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
