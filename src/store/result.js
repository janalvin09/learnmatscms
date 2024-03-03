import { create } from "zustand";
import { persist } from 'zustand/middleware';


const resultStore = persist(
  (set) => ({
  results: [],
  users: [],
    setResults: (data) => set(() => ({
      results: [ ...data ] 
    })),
    setUsers: (data) => set(() => ({
      users: [ ...data ] 
    })),
    
    resetResults: () => set(() => ({ results: [] })),
    resetUsers: () => set(() => ({ users: [] })),
  }),
  {
    name: 'result', // name of the item in the storage (must be unique)
  }
);

export const UseResultStore = create(resultStore);
