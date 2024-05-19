import { create } from 'zustand';

interface SharedState {
    userId: number
    setUserId: (userId: number) => void
}

export const useSharedState = create<SharedState>()((set) => ({
    userId: 0,
    setUserId: (userId) => set({ userId })
}))