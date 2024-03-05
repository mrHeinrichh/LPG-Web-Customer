import { IItemModel } from "@/models";
import { IItemStoreStates } from "./types";

const item: IItemModel = {
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

export const initialState: IItemStoreStates = {
  timeFilter: "Daily",
  units: 10,
  item,
  quantity: 1,
  prices: [],
  reasons: [],
  page: 1,
  limit: 10,
  search: "",
};
