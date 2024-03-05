import { create } from "zustand";
import { initialState } from "./initialState";
import {
  geoApifyRepository,
  transactionRepository,
  uploadRepository,
} from "@/repositories";
import { ICheckoutStore } from "./types";

export default create<ICheckoutStore>((set) => ({
  ...initialState,
  autocomplete: async (search: string) => {
    if (search != "") {
      const { data, status } = await geoApifyRepository.autoComplete(search);
      if (status == "success") {
        return set(() => ({
          locations: data[0].features,
        }));
      }
    }
  },
  setSearch: (value: string) => {
    return set(() => ({
      search: value,
    }));
  },
  setLocation: (value: any) => {
    return set(() => ({
      location: value,
    }));
  },
  setFocused: (value: boolean) => {
    return set(() => ({
      focused: value,
    }));
  },
  uploadImage: async (value: FormData) => {
    const { data, status } = await uploadRepository.image(value);
    return set((state) => {
      if (status == "success") {
        return {
          discountIdImage: data[0].path ?? "",
        };
      }
      return { ...state };
    });
  },
  // TODO: Add types
  createTransaction: async (value: any) => {
    const { status } = await transactionRepository.create(value);
    return set((state) => {
      if (status == "success") {
        return { success: true };
      }
      return { ...state };
    });
  },
  reset: () => {
    return set(() => {
      return { success: false };
    });
  },
}));
