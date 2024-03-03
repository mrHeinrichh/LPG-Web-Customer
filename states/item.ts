import { TimeFilter } from "@/interfaces";
import { IItemModel, IPriceModel } from "@/models";
import { IQuery, getItemById, getPrices } from "@/repositories";
import { create } from "zustand";

export interface IItemStore {
  getItemById: (_id: string) => Promise<void>;
  item: IItemModel;
  quantity: number;
  increment: (limit: number) => void;
  decrement: () => void;
  timeFilter: TimeFilter;
  setTimeFilter: (timeFilter: TimeFilter) => void;
  units: number;
  setUnits: (value: number) => void;
  getPrices: ({}: IQuery) => Promise<void>;
  prices: IPriceModel<string>[];
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
  timeFilter: "Daily",
  units: 10,
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
  setTimeFilter: (timeFilter: TimeFilter) => {
    return set(() => ({
      timeFilter,
    }));
  },
  setUnits: (units: number) => {
    return set(() => ({
      units,
    }));
  },
  prices: [],
  getPrices: async ({ page = 1, limit = 10, filter = "{}" }: IQuery) => {
    const { data, status } = await getPrices<string>({ page, limit, filter });
    if (status == "success") {
      return set(() => ({
        prices: data,
      }));
    }
  },
}));
