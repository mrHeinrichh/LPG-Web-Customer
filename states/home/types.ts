import { IQuery } from "@/interfaces";
import { IItemModel } from "@/models";

export type HomeStore = IHomeStoreStates & IHomeStoreActions;

export interface SetNavbarVisibleArgs {
  value: boolean;
}
export interface IHomeStoreStates {
  navbarVisible: boolean;
  items: IItemModel[];
  brandNewTanks: IItemModel[];
  refillTanks: IItemModel[];
  accessories: IItemModel[];
}

export interface IHomeStoreActions {
  setNavbarVisible: ({}: SetNavbarVisibleArgs) => void;
  getItems: ({}: IQuery) => Promise<void>;
}
