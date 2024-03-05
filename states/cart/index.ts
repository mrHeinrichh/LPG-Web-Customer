import { ICartItemModel, IItemModel } from "@/models";
import { create } from "zustand";
import { ICartStore } from "./types";
import { initialState } from "./initialState";

export default create<ICartStore>((set) => ({
  ...initialState,
  addToCart: (item: IItemModel, quantity: number) => {
    return set((state) => {
      const temp = state.items.find((e: any) => e._id == item._id);
      if (temp) {
        return {
          items: [
            ...state.items.map((e: any) => {
              if (e._id == item._id) e.quantity += quantity;
              return e;
            }),
          ],
        };
      }

      return {
        items: [...state.items, { ...item, quantity }],
      };
    });
  },
  deleteItems: (itemId: string[]) => {
    return set((state) => {
      const cartItems = state.items.filter(
        (e: ICartItemModel) => !itemId.find((id: string) => id == e._id)
      );
      const selected = state.selected.filter(
        (e: ICartItemModel) => !itemId.find((id: string) => id == e._id)
      );
      const total = selected.reduce(
        (total: number, item: ICartItemModel) =>
          total + item.customerPrice * item.quantity,
        0
      );
      return {
        items: cartItems,
        selected,
        total,
      };
    });
  },
  resetItems: () => {
    return set(() => ({
      items: [],
      total: 0,
    }));
  },
  addToSelected: (item: ICartItemModel) => {
    return set((state) => {
      const selected = [...state.selected, item];
      const total = selected.reduce(
        (total: number, item: any) =>
          total + item.customerPrice * item.quantity,
        0
      );
      return {
        selected,
        total,
      };
    });
  },
  removeFromSelected: (itemId: string) => {
    return set((state) => {
      const filtered = state.selected.filter(
        (item: ICartItemModel) => item._id != itemId
      );
      const total = filtered.reduce(
        (total: number, item: any) =>
          total + item.customerPrice * item.quantity,
        0
      );
      return {
        selected: filtered,
        total,
      };
    });
  },
}));
