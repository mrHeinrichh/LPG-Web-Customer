import { IItemModel } from "@/models";
import { getItemById } from "@/repositories";
import { create } from "zustand";

export interface IItemStore {
  getItemById: (_id: string) => Promise<void>;
  item: IItemModel;
  quantity: number;
  increment: (limit: number) => void;
  decrement: () => void;
}
const itemInitialState: IItemModel = {
  name: "",
  category: "",
  description: "",
  weight: 0,
  stock: 0,
  customerPrice: 0,
  retailerPrice: 0,
  image: "",
  type: "",
  deleted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default create<IItemStore>((set) => ({
  item: itemInitialState,
  quantity: 1,
  getItemById: async (_id: string) => {
    const { data, status } = await getItemById(_id);
    if (status == "success" && data.length !== 0) {
      return set(() => ({
        item: data[0],
      }));
    }
  },
  increment: (limit: number) => {
    return set((prev) => {
      if (limit > prev.quantity) {
        return {
          quantity: prev.quantity + 1,
        };
      }
      return {
        ...prev,
      };
    });
  },
  decrement: () => {
    return set((prev) => {
      if (prev.quantity > 1) {
        return {
          quantity: prev.quantity - 1,
        };
      }
      return {
        ...prev,
      };
    });
  },
}));
