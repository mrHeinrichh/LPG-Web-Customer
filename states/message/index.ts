import { messageRepository } from "@/repositories";
import { create } from "zustand";
import { MessageStore } from "./types";
import { initialState } from "./initialState";

export default create<MessageStore>((set) => ({
  ...initialState,
  getMessages: async (user: string) => {
    const { data, status } = await messageRepository.getMessages(user);
    if (status == "success") {
      return set(() => ({ messages: data }));
    }
  },
  addMessage: async (request: any) => {
    const { data, status } = await messageRepository.createMessage(request);
    if (status === "success") {
      return set((state: any) => ({
        messages: [...state.messages, data[0]],
      }));
    }
  },
  addNewMessage: (data: any) => {
    return set((state: any) => ({
      messages: [...state.messages, data],
    }));
  },
}));
