import { create } from "zustand";
import { initialState } from "./initialState";
import { faqRepository } from "@/repositories";
import { FaqStore } from "./types";

export default create<FaqStore>((set) => ({
  ...initialState,
  getFaqs: async () => {
    const { data, status } = await faqRepository.getFaqs({});
    if (status == "success") {
      return set(() => ({ faqs: data }));
    }
  },
}));
