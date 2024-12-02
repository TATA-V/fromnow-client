import { create } from 'zustand';

interface UseAppStore {
  isFirstEntry: boolean;
  setIsFirstEntry: (isFirstEntry: boolean) => void;
}

const useAppStore = create<UseAppStore>(set => ({
  isFirstEntry: true,
  setIsFirstEntry: (isFirstEntry: boolean) => set({ isFirstEntry }),
}));

export default useAppStore;
