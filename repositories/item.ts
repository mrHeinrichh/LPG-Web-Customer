import { get } from "@/config";
import { IHttpResponse, IQuery } from "@/interfaces";
import { IItemModel } from "@/models";

export async function getItems({ page = 1, limit = 10 }: IQuery) {
  return (await get(`items?page=${page}&limit=${limit}`))
    .data as IHttpResponse<IItemModel>;
}

export async function getItemById(_id: string) {
  return (await get(`items/${_id}`)).data as IHttpResponse<IItemModel>;
}

export default { getItems, getItemById };
