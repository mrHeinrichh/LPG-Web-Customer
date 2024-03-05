import { IQuery, TimeFilter } from "@/interfaces";
import { IItemModel, IPriceModel } from "@/models";

export type ItemStore = IItemStoreStates & IItemStoreActions;

export interface IItemStoreStates {
  item: IItemModel;
  quantity: number;
  timeFilter: TimeFilter;
  units: number;
  prices: IPriceModel<string>[];
  reasons: IPriceModel<IItemModel>[];
  page: number;
  limit: number;
  search: string;
}

export interface IItemStoreActions {
  increment: (limit: number) => void;
  decrement: () => void;
  setTimeFilter: (timeFilter: TimeFilter) => void;
  setUnits: (value: number) => void;
  getPrices: ({}: IQuery) => Promise<void>;
  setSearch: (value: string) => void;
  incrementPage: () => void;
  decrementPage: () => void;
  setLimit: (value: number) => void;
  getReasons: ({}: IQuery) => Promise<void>;
  getItemById: (_id: string) => Promise<void>;
}
