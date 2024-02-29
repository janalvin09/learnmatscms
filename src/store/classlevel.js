import { create } from "zustand";
import { persist } from 'zustand/middleware';


const classLevelStore = persist(
  (set) => ({
    classlevels: [],
    setClasslevels: (data) => set(() => ({
      classlevels: [ ...data ] 
    })),
    resetClasslevels: () => set(() => ({ classlevels: [] })),
  }),
  {
    name: 'classlevel', // name of the item in the storage (must be unique)
  }
);

export const UseClassLevelStore = create(classLevelStore);
