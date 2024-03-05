import { create } from "zustand";
import { initialState } from "./initialState";
import { AuthStore } from "./types";
import { userRepository } from "@/repositories";

export default create<AuthStore>((set) => ({
  ...initialState,
  authenticate: async (request: any) => {
    const { data, status } = await userRepository.authenticate(request);
    if (status == "success") {
      return set(() => ({ user: data[0] }));
    }
  },
  setUser: (user: any) => {
    return set(() => ({ user: user }));
  },
  logout: () => {
    return set(() => ({ user: null }));
  },
}));
