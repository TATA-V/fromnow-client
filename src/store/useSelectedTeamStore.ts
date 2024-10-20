import { Moment } from 'moment-modification-rn';
import { create } from 'zustand';

interface SelectedTeam {
  title: string;
  date: Moment | string;
}

interface SelectedTeamStore extends SelectedTeam {
  setTeam: (values: Partial<SelectedTeam>) => void;
}

const initial: SelectedTeam = {
  title: '',
  date: '',
};

const useSelectedTeamStore = create<SelectedTeamStore>(set => ({
  ...initial,
  setTeam: (values: Partial<SelectedTeam>) => set(prev => ({ ...prev, ...values })),
}));

export default useSelectedTeamStore;
