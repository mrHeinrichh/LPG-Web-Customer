import { get } from "@/config";
import { IHttpResponse } from "@/interfaces";

export async function autoComplete(search: string) {
  return (await get(`geoapify/autocomplete?search=${search}`))
    .data as IHttpResponse<any>;
}

export default { autoComplete };
