import { ICheckoutStoreStates } from "./types";

export const initialState: ICheckoutStoreStates = {
  locations: [],
  location: {},
  focused: false,
  search: "",
  discountIdImage: null,
  success: false,
};
