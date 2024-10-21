import { Moment } from 'moment-modification-rn';
import { create } from 'zustand';

interface SelectedTeam {
  id: number;
  title: string;
  createdAt: Moment | string;
  recivedAt: Moment | string;
}

interface SelectedTeamStore extends SelectedTeam {
  setTeam: (values: Partial<SelectedTeam>) => void;
}

const initial: SelectedTeam = {
  id: 0,
  title: '',
  createdAt: '',
  recivedAt: '',
};

const useSelectedTeamStore = create<SelectedTeamStore>(set => ({
  ...initial,
  setTeam: (values: Partial<SelectedTeam>) => set(prev => ({ ...prev, ...values })),
}));

export default useSelectedTeamStore;
