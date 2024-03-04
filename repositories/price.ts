import { get } from "@/config";
import { IHttpResponse, IQuery } from "@/interfaces";
import { IAnnouncementModel, IPriceModel } from "@/models";

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

export default { getPrices };
