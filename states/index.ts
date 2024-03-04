import { get, post } from "@/config";
import { create } from "zustand";

import useAnnouncementStore from "./announcements";
import useHomeStore from "./home";
import useItemStore from "./item";
import useCartStore from "./cart";
import useCheckoutStore from "./checkout";
export {
  useCheckoutStore,
  useCartStore,
  useItemStore,
  useAnnouncementStore,
  useHomeStore,
};

export const useAuthStore = create((set) => ({
  user: null,
  access: null,
  refresh: null,
  authenticate: async (request: any) => {
    const { data } = await post(`users/authenticate`, {
      ...request,
      type: "Customer",
    });
    if (data.status == "success") {
      return set(() => ({ user: data.data[0] }));
    }
  },
  setUser: (user: any) => {
    return set(() => ({ user: user }));
  },
  logout: () => {
    return set(() => ({ user: null }));
  },
}));

export const useFaqsStore = create((set) => ({
  faqs: [],
  getFaqs: async () => {
    const { data } = await get(`faqs`);
    if (data.status == "success") {
      return set(() => ({ faqs: data.data }));
    }
  },
}));

export const useMessagesStore = create((set) => ({
  messages: [],
  getMessages: async (user: string) => {
    const { data } = await get(
      `messages?filter={"$or": [{"from": "${user}"}, {"to": "${user}"}]}`
    );
    if (data.status == "success") {
      return set(() => ({ messages: data.data }));
    }
  },
  addMessage: async (request: any) => {
    const { data } = await post(`messages`, request);
    if (data.status === "success") {
      return set((state: any) => ({
        messages: [...state.messages, data.data[0]],
      }));
    }
  },
  addNewMessage: (data: any) => {
    return set((state: any) => ({
      messages: [...state.messages, data],
    }));
  },
}));

export const useGeoApifyStore = create((set) => ({}));

export const useTransactionsStore = create((set) => ({
  transactions: [],
  getTransactions: async (query: string) => {
    const { data } = await get(`transactions/?${query}`);
    if (data.status == "success") {
      return set(() => ({
        transactions: data.data,
      }));
    }
  },
}));
