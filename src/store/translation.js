import { create } from "zustand";
import { persist } from 'zustand/middleware';


const translationStore = persist(
  (set) => ({
    translations: [],
    setTranslations: (data) => set(() => ({
      translations: [ ...data ] 
    })),
    resetTranslations: () => set(() => ({ translations: [] })),
  }),
  {
    name: 'translation', // name of the item in the storage (must be unique)
  }
);

export const UseTranslationStore = create(translationStore);
