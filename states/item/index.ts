import { create } from "zustand";
import { initialState } from "./initialState";
import { itemRepository, priceRepository } from "@/repositories";
import { ItemStore } from "./types";
import { IQuery, TimeFilter } from "@/interfaces";
import { IItemModel } from "@/models";

export default create<ItemStore>((set) => ({
  ...initialState,
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
