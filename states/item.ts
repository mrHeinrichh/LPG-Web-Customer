import { IQuery, TimeFilter } from "@/interfaces";
import { IItemModel, IPriceModel } from "@/models";
import { priceRepository, itemRepository } from "@/repositories";
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
  prices: IPriceModel<string>[];
  getPrices: ({}: IQuery) => Promise<void>;
  reasons: IPriceModel<IItemModel>[];
  page: number;
  limit: number;
  search: string;
  setSearch: (value: string) => void;
  incrementPage: () => void;
  decrementPage: () => void;
  setLimit: (value: number) => void;
  getReasons: ({}: IQuery) => Promise<void>;
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
    const { data, status } = await itemRepository.getItemById(_id);
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
    const { data, status } = await priceRepository.getPrices<string>({
      page,
      limit,
      filter,
    });
    if (status == "success") {
      return set(() => ({
        prices: data,
      }));
    }
  },
  reasons: [],
  page: 1,
  limit: 10,
  search: "",
  getReasons: async ({ page = 1, limit = 10, filter = "{}" }: IQuery) => {
    const { data, status } = await priceRepository.getPrices<IItemModel>({
      page,
      limit,
      filter,
      populate: "item",
    });
    if (status == "success") {
      return set(() => ({
        reasons: data,
      }));
    }
  },
  setSearch: (value: string) => {
    return set(() => ({
      search: value,
    }));
  },
  incrementPage: () => {
    return set((state) => ({
      page: state.page + 1,
    }));
  },
  decrementPage: () => {
    return set((state) => {
      if (state.page > 1) {
        return {
          page: state.page - 1,
        };
      }
      return {
        ...state,
      };
    });
  },
  setLimit: (value: number) => {
    return set(() => ({
      limit: value,
    }));
  },
}));
// search: string;
// setSearch: (value: string) => void;
// incrementPage: () => void;
// decrementPage: () => void;
