import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IAuthStore } from "./store.type";

export const useUserStore = create<IAuthStore>()(
  persist(
    (set) => ({
      clearStore: () => set((store) => ({ ...store, user: null })),
      user: null,
      setUser: (user) => set((store) => ({ ...store, user })),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
