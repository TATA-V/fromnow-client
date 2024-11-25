import { create } from 'zustand';

interface UseAppState {
  isFirstEntry: boolean;
  setIsFirstEntry: (isFirstEntry: boolean) => void;
}

const useAppState = create<UseAppState>(set => ({
  isFirstEntry: true,
  setIsFirstEntry: (isFirstEntry: boolean) => set({ isFirstEntry }),
}));

export default useAppState;
