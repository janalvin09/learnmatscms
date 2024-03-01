import { create } from "zustand";
import { persist } from 'zustand/middleware';


const questionStore = persist(
  (set) => ({
    questions: [],
    setQuestions: (data) => set(() => ({
      questions: [ ...data ] 
    })),
    resetQuestions: () => set(() => ({ questions: [] })),
  }),
  {
    name: 'question', // name of the item in the storage (must be unique)
  }
);

export const UseQuestionStore = create(questionStore);
