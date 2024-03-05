import { ICartItemModel, IItemModel } from "@/models";

export type ICheckoutStore = ICheckoutStoreStates & ICheckoutStoreActions;
export interface ICheckoutStoreStates {
  // TODO: Add types
  locations: any[];
  search: string;
  // TODO: Add types
  location: any;
  focused: boolean;
  discountIdImage: null | string;
  success: boolean;
}

export interface ICheckoutStoreActions {
  autocomplete: (search: string) => Promise<void>;
  setSearch: (value: string) => void;
  // TODO: Add types
  setLocation: (value: any) => void;
  setFocused: (value: boolean) => void;
  uploadImage: (value: FormData) => Promise<void>;
  // TODO: Add types to args
  createTransaction: (value: any) => Promise<void>;
  reset: () => void;
}
