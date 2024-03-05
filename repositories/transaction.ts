import { get, post } from "@/config";
import { IHttpResponse } from "@/interfaces";
import { IDeliveryModel } from "@/models";

// TODO: add types to args
export async function getTransactions(query: string) {
  return (await get(`transactions/?${query}`)).data as IHttpResponse<
    IDeliveryModel<string, string>
  >;
}

// TODO: add types to args
export async function create(body: any) {
  return (await post("transactions", body)).data as IHttpResponse<
    IDeliveryModel<string, string>
  >;
}

export default { getTransactions, create };
