import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

const userStore = persist(
  (set) => ({
  user: null, // USERk
  token: null,
  
  setUser: (data) => set(() => ({
    user: data
  })),
  setToken: (data) => set(() => ({
    token: data
  })),
  setUserLogout: () => set(() => ({ user: null, token: null })),
  }),
  {
    name: 'user', // name of the item in the storage (must be unique)
    storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
  }
);

export  const useUserStore = create(userStore);
