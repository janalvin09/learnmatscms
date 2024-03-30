import { create } from "zustand";
import { persist } from 'zustand/middleware';


const categoryStore = persist(
  (set) => ({
    categories: [],
    setCategories: (data) => set(() => ({
      categories: [ ...data ] 
    })),
    resetCategories: () => set(() => ({ categories: [] })),
  }),
  {
    name: 'category', // name of the item in the storage (must be unique)
  }
);

export const UseCategoryStore = create(categoryStore);
