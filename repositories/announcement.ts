import { get } from "@/config";
import { IHttpResponse, IQuery } from "@/interfaces";
import { IAnnouncementModel } from "@/models";

async function getAnnouncements({ page = 1, limit = 10 }: IQuery) {
  return (await get(`announcements?page=${page}&limit=${limit}`))
    .data as IHttpResponse<IAnnouncementModel>;
}

export default { getAnnouncements };
