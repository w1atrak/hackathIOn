import { create } from 'zustand';
import { type ApiResponse } from '~/types/types';
interface SharedState {
    userId: number
    setUserId: (userId: number) => void
    database: ApiResponse
    setDatabase: (database: ApiResponse) => void
}

export const useSharedState = create<SharedState>()((set) => ({
    userId: 0,
    setUserId: (userId) => set({ userId }),
    database: { users: [], classes: [], tasks: [], scores: [] },
    setDatabase: (database) => set({ database })
}))