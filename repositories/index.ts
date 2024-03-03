import { get, remove } from "@/config";
import { IAnnouncementModel, IItemModel } from "@/models";

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
