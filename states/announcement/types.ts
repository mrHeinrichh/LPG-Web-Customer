import { IAnnouncementModel } from "@/models";

export type AnnouncementStore = IAnnouncementStoreStates &
  IAnnouncementStoreActions;

export interface IAnnouncementStoreStates {
  announcements: IAnnouncementModel[];
  page: number;
  limit: number;
}

export interface IAnnouncementStoreActions {
  announcements: IAnnouncementModel[];
  page: number;
  limit: number;
}
