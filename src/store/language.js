import { create } from "zustand";
import { persist } from 'zustand/middleware';


const languageStore = persist(
  (set) => ({
    languages: [],
    setLanguages: (data) => set(() => ({
      languages: [ ...data ] 
    })),
    resetLanguages: () => set(() => ({ languages: [] })),
  }),
  {
    name: 'language', // name of the item in the storage (must be unique)
  }
);

export const UseLanguageStore = create(languageStore);
