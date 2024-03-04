import { get, post } from "@/config";
import { create } from "zustand";

import useAnnouncementStore from "./announcements";
import useHomeStore from "./home";
import useItemStore from "./item";
import useCartStore from "./cart";
export { useCartStore, useItemStore, useAnnouncementStore, useHomeStore };

export const useCheckoutStore = create((set) => ({
  checkoutItems: [],
  addItem: (item: any) => {
    return set((state: any) => ({
      checkoutItems: [item, ...state.checkoutItems],
    }));
  },
  removeItem: (_id: any) => {
    return set((state: any) => ({
      checkoutItems: [...state.checkoutItems.filter((e: any) => e._id != _id)],
    }));
  },
}));

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

// export const useItemStore = create((set) => ({
//   items: [],
//   getItems: async () => {
//     const { data } = await get(`items`);
//     if (data.status == "success") {
//       return set(() => ({ items: data.data }));
//     }
//   },
//   removeItem: (id: any) => {
//     set((state: any) => ({
//       items: [...state.items.filter((e: any) => e._id != id)],
//     }));
//   },
// }));

export const useGeoApifyStore = create((set) => ({
  locations: [],
  autocomplete: async (search: string) => {
    if (search != "") {
      const { data } = await get(`geoapify/autocomplete?search=${search}`);
      if (data.status == "success") {
        return set((state: any) => ({
          locations: data.data[0].features,
        }));
      }
    }
  },
}));

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

export const usePriceStore = create((set) => ({
  prices: [],
  reasons: [],
  getPrices: async (
    page: number = 1,
    limit: number = 5,
    filter = "{}",
    populate = ""
  ) => {
    const { data } = await get(
      `prices?page=${page}&limit=${limit}&filter=${filter}&populate=${populate}`
    );

    if (data.status == "success") {
      return set(() => ({
        prices: data.data,
      }));
    }
  },
  getReasons: async (page: number = 1, limit: number = 5, filter = "{}") => {
    const { data } = await get(
      `prices?page=${page}&limit=${limit}&filter=${filter}&populate=item`
    );
    if (data.status == "success") {
      return set(() => ({
        reasons: data.data.map((e: any) => {
          e.name = e.item.name;
          return e;
        }),
      }));
    }
  },
}));
