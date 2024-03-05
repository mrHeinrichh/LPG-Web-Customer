import { ICartItemModel, IItemModel } from "@/models";

export type ICartStore = ICartStoreStates & ICartStoreActions;
export interface ICartStoreStates {
  items: ICartItemModel[];
  selected: ICartItemModel[];
  total: number;
}

export interface ICartStoreActions {
  addToCart: (item: IItemModel, quantity: number) => void;
  deleteItems: (itemIds: string[]) => void;
  resetItems: () => void;
  addToSelected: (item: ICartItemModel) => void;
  removeFromSelected: (itemId: string) => void;
}
