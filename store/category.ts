import { create } from 'zustand'

interface state {
  activatedId: number
  setActivatedId: (activatedId: number) => void
}

export const useCategoryStore = create<state>()((set) => ({
  activatedId: 1,
  setActivatedId: (activatedId: number) => set({ activatedId: activatedId }),
}))
