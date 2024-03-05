import { get } from "@/config";
import { IHttpResponse, IQuery } from "@/interfaces";
import { IPriceModel } from "@/models";

export async function getFaqs<T>({}: IQuery) {
  return (await get(`faqs?page=${0}&limit=${0}`)).data as IHttpResponse<
    IPriceModel<T>
  >;
}

export default { getFaqs };
