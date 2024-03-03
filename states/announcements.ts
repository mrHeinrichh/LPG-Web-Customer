import { IAnnouncementModel } from "@/models";
import { IQuery, getAnnouncements } from "@/repositories";
import { create } from "zustand";

export interface IAnnouncementStore {
  announcements: IAnnouncementModel[];
  getAnnouncements: ({}: IQuery) => Promise<void>;
  page: number;
  limit: number;
  next: () => void;
  back: () => void;
}

export default create<IAnnouncementStore>((set) => ({
  announcements: [],
  page: 1,
  limit: 1,
  getAnnouncements: async ({ page = 1, limit = 10 }) => {
    const { data, status } = await getAnnouncements({ page, limit });
    if (status == "success") {
      return set(() => ({ announcements: data }));
    }
  },
  next: () => {
    return set((state) => {
      return { page: state.page + 1 };
    });
  },
  back: () => {
    return set((state) => {
      if (state.page > 1) {
        return { page: state.page - 1 };
      }
      return { ...state };
    });
  },
}));
