import { create } from 'zustand';

interface UserStoreState {
  name: string;
  setName: (name: string) => void;
  reset: () => void;
}

const useUserStore = create<UserStoreState>(set => ({
  name: '',
  setName: (name: string) => set({ name }),
  reset: () => set({ name: '' }),
}));

export default useUserStore;
