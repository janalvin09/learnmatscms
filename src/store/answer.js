import { create } from "zustand";
import { persist } from 'zustand/middleware';


const answerStore = persist(
  (set) => ({
    answers: [],
    setAnswers: (data) => set(() => ({
      answers: [ ...data ] 
    })),
    resetAnswers: () => set(() => ({ answers: [] })),
  }),
  {
    name: 'answer', // name of the item in the storage (must be unique)
  }
);

export const UseAnswerStore = create(answerStore);
