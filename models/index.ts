export interface IModel {
  _id?: string;
  deleted: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IAnnouncementModel extends IModel {
  image: string;
  start: Date | string;
  end: Date | string;
  text?: string;
}

export interface IItemModel extends IModel {
  name: string;
  category: "Brand New Tanks" | "Refill Tanks" | "Accessories" | "";
  description: string;
  weight: number;
  stock: number;
  customerPrice: number;
  retailerPrice: number;
  image: string;
  type: "Product" | "Accessory" | "";
}
