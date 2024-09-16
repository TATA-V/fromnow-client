import { Team, TeamInvite } from '@clientTypes/team';
import { instance } from '@api/axiosInstance';

export interface UpdateOne {
  diaryId: number;
  newTitle: string;
}

export const getAll = async () => {
  const res = await instance.get('/api/diary/overview');
  return res.data.data;
};

export const deleteOne = async (diaryId: number) => {
  const res = await instance.delete(`/api/diary/${diaryId}`);
  return res;
};

export const updateOne = async (data: UpdateOne) => {
  const { diaryId, newTitle } = data;
  const query = new URLSearchParams({ diaryId: diaryId.toString() });
  const res = instance.put(`api/diary?${query}`, { newTitle });
  return res;
};

export const postOne = async (body: Omit<Team, 'id'>) => {
  const res = await instance.post('/api/diary', body);
  return res;
};

export const postInvite = async (body: TeamInvite) => {
  const res = await instance.post('api/diary/invite', body);
  return res;
};

export const postAccept = async (diaryId: number) => {
  const res = await instance.post('api/diary/accept', { diaryId });
  return res;
};
