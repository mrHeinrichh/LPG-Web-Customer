import { announcementRepository } from "@/repositories";
import { create } from "zustand";
import { AnnouncementStore } from "./types";
import { initialState } from "./initialState";

export default create<AnnouncementStore>((set) => ({
  ...initialState,
  getAnnouncements: async ({ page = 1, limit = 10 }) => {
    const { data, status } = await announcementRepository.getAnnouncements({
      page,
      limit,
    });
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
