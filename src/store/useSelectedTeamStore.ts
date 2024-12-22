import { Moment } from 'moment-modification-rn';
import { getDate } from '@utils/formatDate';
import { create } from 'zustand';

export interface SelectedTeam {
  id: number;
  title: string;
  createdAt: Moment | string;
  recivedAt: Moment | string;
  targetDate: string;
}

interface SelectedTeamStore extends SelectedTeam {
  setSelectedTeam: (values: Partial<SelectedTeam>) => void;
}

const initial: SelectedTeam = {
  id: 0,
  title: '',
  createdAt: '',
  recivedAt: '',
  targetDate: getDate().utcOffset(9).format('YYYY-MM-DD'),
};

const useSelectedTeamStore = create<SelectedTeamStore>(set => ({
  ...initial,
  setSelectedTeam: (values: Partial<SelectedTeam>) => set(prev => ({ ...prev, ...values })),
}));

export default useSelectedTeamStore;
