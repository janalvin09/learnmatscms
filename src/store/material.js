import { create } from "zustand";
import { persist } from 'zustand/middleware';


const materialStore = persist(
  (set) => ({
    materials: [],
    setMaterials: (data) => set(() => ({
      materials: [ ...data ] 
    })),
    resetMaterials: () => set(() => ({ materials: [] })),
  }),
  {
    name: 'material', // name of the item in the storage (must be unique)
  }
);

export const UseMaterialStore = create(materialStore);
