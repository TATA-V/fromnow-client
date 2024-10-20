import { create } from 'zustand';

interface UserStore {
  name: string;
  setName: (name: string) => void;
  reset: () => void;
}

const useUserStore = create<UserStore>(set => ({
  name: '',
  setName: (name: string) => set({ name }),
  reset: () => set({ name: '' }),
}));

export default useUserStore;
