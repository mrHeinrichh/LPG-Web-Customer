import {
  transactionRepository,
  uploadRepository,
  geoApifyRepository,
} from "@/repositories";
import { create } from "zustand";

export interface ICheckoutStore {
  // TODO: Add types
  locations: any[];
  autocomplete: (search: string) => Promise<void>;
  search: string;
  setSearch: (value: string) => void;
  // TODO: Add types
  location: any;
  // TODO: Add types
  setLocation: (value: any) => void;
  focused: boolean;
  setFocused: (value: boolean) => void;
  discountIdImage: null | string;
  uploadImage: (value: FormData) => Promise<void>;
  // TODO: Add types to args
  createTransaction: (value: any) => Promise<void>;
  success: boolean;
  reset: () => void;
}

export default create<ICheckoutStore>((set) => ({
  locations: [],
  location: {},
  focused: false,
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
  search: "",
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
  discountIdImage: null,
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
  success: false,
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
    return set((state) => {
      return { success: false };
    });
  },
}));
