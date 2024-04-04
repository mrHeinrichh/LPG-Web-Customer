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

export interface ICartItemModel extends IItemModel {
  quantity: number;
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

export interface IPriceModel<T> extends IModel {
  item: T;
  price: number;
  reason?: string;
  type: "Customer" | "Retailer";
}

export interface ITransactionModel extends IModel {
  name: string;
  contactNumber: string;
  total: number;
  items: ICartItemModel[];
  discounted: boolean;
  completed: boolean;
  discountIdImage: string | null;
}
export interface ITransactionFormData {
  contactNumber: string;
  name: string;
  houseLotBlk: string;
  barangay: string;
  deliveryDate: string;
}


export type DevliveryStatus =
  | "Pending"
  | "Approved"
  | "Declined"
  | "Completed"
  | "On Going"
  | "Cancelled"
  | "Archived"
  | "Completed";

export interface IDeliveryModel<T, K> extends ITransactionModel {
  deliveryLocation: string;
  houseLotBlk: string;
  paymentMethod: "COD" | "GCASH";
  status: DevliveryStatus;
  installed: boolean;
  deliveryDate: Date | string;
  barangay: string;
  total: number;
  to: T;
  rider: K;
  // TODO: Add types
  feedback: any[];
  
  // TODO: Add types
  statuses: any[];
  rating: number;
  pickupImages: string;
  completionImages: string;
  cancellationImages: string;
  cancelReason?: string;
  pickedUp: boolean;
  hasFeedback: boolean;
  long?: number;
  lat?: number;
}
