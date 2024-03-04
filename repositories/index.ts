import { get, post, remove } from "@/config";
import {
  IAnnouncementModel,
  IDeliveryModel,
  IItemModel,
  IPriceModel,
} from "@/models";

export type ResponseStatus = "success" | "failed";

export interface IHttpResponseMeta {
  refresh?: string;
  access?: string;
  page?: Number;
  max?: Number;
  limit?: Number;
}
export interface IQuery {
  page?: number;
  limit?: number;
  filter?: string;
  populate?: string;
}
export interface IHttpResponse<T> {
  data: T[];
  status: ResponseStatus;
  message: string;
  meta?: IHttpResponseMeta;
}

export async function getAnnouncements({ page = 1, limit = 10 }: IQuery) {
  return (await get(`announcements?page=${page}&limit=${limit}`))
    .data as IHttpResponse<IAnnouncementModel>;
}

export async function getItems({ page = 1, limit = 10 }: IQuery) {
  return (await get(`items?page=${page}&limit=${limit}`))
    .data as IHttpResponse<IItemModel>;
}

export async function getItemById(_id: string) {
  return (await get(`items/${_id}`)).data as IHttpResponse<IItemModel>;
}

export async function getPrices<T>({
  page = 1,
  limit = 10,
  filter = "{}",
  populate = "",
}: IQuery) {
  return (
    await get(
      `prices?page=${page}&limit=${limit}&filter=${filter}&populate=${populate}`
    )
  ).data as IHttpResponse<IPriceModel<T>>;
}

export async function autoComplete(search: string) {
  return (await get(`geoapify/autocomplete?search=${search}`))
    .data as IHttpResponse<any>;
}

export async function uploadImage(body: FormData) {
  return (await post<FormData>("upload/image", body))
    .data as IHttpResponse<any>;
}

// TODO: add types to args
export async function createTransaction(body: any) {
  return (await post("transactions", body)).data as IHttpResponse<
    IDeliveryModel<string, string>
  >;
}
