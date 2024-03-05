import { IAnnouncementModel } from "@/models";

export type AnnouncementStore = IAnnouncementStoreStates &
  IAnnouncementStoreActions;

export interface IAnnouncementStoreStates {
  announcements: IAnnouncementModel[];
  page: number;
  limit: number;
}

// TODO: Add types
export interface IAnnouncementStoreActions {
  getAnnouncements: ({}: any) => Promise<void>;
  next: () => void;
  back: () => void;
}
