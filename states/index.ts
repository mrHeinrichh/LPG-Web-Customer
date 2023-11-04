import { API_URL } from "@/env";
import { create } from "zustand";

export const useItemStore = create((set) => ({
  items: [],
  getItems: async () => {
    const response = await fetch(`${API_URL}items`);
    const data = (await response.json()).data;
    return set(() => ({ items: data }));
  },
  removeItem: (id: any) => {
    set((state: any) => ({
      items: [...state.items.filter((e: any) => e._id != id)],
    }));
  },
}));

export const useCartStore = create((set) => ({
  cart: [],
  addToCart: (item: any) => {
    set((state: any) => ({
      cart: [...state.cart, item],
    }));
  },
}));
